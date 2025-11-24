// OAuth callback handler for Decap CMS
module.exports = async (req, res) => {
  const { code, state } = req.query;
  if (!code) {
    return res.status(400).send('Missing authorization code');
  }
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Authorizing...</title>
  <meta charset="utf-8" />
  <script>
    (function() {
      try {
        // Immediately post success message expected by Decap CMS
        var payload = 'authorization:github:success:' + JSON.stringify({ code: '${code}', state: '${state}' });
        // Use * to avoid origin mismatch between www/non-www
        window.opener && window.opener.postMessage(payload, '*');
      } catch (e) {
        console.error('Callback postMessage failed', e);
      }
      // Optional: close popup after short delay
      setTimeout(function(){ window.close(); }, 500);
    })();
  </script>
</head>
<body>
  <p>Authorizing… You can close this window.</p>
</body>
</html>`;
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
};
