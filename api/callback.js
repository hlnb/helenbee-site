// OAuth callback handler for Decap CMS
module.exports = async (req, res) => {
  const { code, state } = req.query;
  if (!code) {
    return res.status(400).send('Missing authorization code');
  }
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return res.status(500).send('Server missing OAuth env vars');
  }
  let token = null;
  let errorMsg = null;
  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code })
    });
    const data = await tokenResponse.json();
    if (data.error) {
      errorMsg = data.error_description || data.error;
    } else {
      token = data.access_token;
    }
  } catch (e) {
    errorMsg = 'Token exchange network failure';
  }
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8" /><title>Authorizing…</title><script>(function(){
    function post(kind, obj){
      try { window.opener && window.opener.postMessage(kind + ':' + JSON.stringify(obj), '*'); } catch(e) {}
    }
    if('${token}') {
      post('authorization:github:success', { token: '${token}', provider: 'github', state: '${state || ''}' });
    } else {
      post('authorization:github:error', { error: '${errorMsg || 'Unknown error'}' });
    }
    setTimeout(function(){ window.close(); }, 800);
  })();</script></head><body><p>Finishing GitHub authorization…</p></body></html>`;
  res.setHeader('Content-Type', 'text/html');
  res.status(token ? 200 : 400).send(html);
};
