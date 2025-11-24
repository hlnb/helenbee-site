// OAuth callback handler for Decap CMS
module.exports = async (req, res) => {
  const { code, state } = req.query;
  if (!code) {
    return res.status(400).send('Missing authorization code');
  }
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8" /><title>Authorizing…</title><script>(function(){
    try {
      var payload = 'authorization:github:success:' + JSON.stringify({ code: '${code}', state: '${state || ''}' });
      window.opener && window.opener.postMessage(payload, '*');
    } catch(e) {}
    setTimeout(function(){ window.close(); }, 600);
  })();</script></head><body><p>Returning to application…</p></body></html>`;
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
};
