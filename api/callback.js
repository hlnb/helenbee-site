// OAuth callback handler for Decap CMS
module.exports = async (req, res) => {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  // Build the callback HTML that will communicate with the CMS
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Authorizing...</title>
  <script>
    (function() {
      function receiveMessage(e) {
        console.log("Received message:", e);
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({ code, state })}',
          e.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);

      console.log("Sending message to opener");
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script>
</head>
<body>
  <p>Authorizing... You can close this window.</p>
</body>
</html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
};
