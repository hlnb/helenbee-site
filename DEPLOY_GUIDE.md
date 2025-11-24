# Quick Deploy Guide

## Current Status

✅ Decap CMS files created
✅ OAuth endpoints configured
✅ Local build successful
⚠️ Need to deploy to see CMS at https://helenburgess.id.au/admin/

## Deploy Steps

### 1. Commit and Push Changes

```bash
# Add all new files
git add .

# Commit with a descriptive message
git commit -m "Add Decap CMS with custom OAuth authentication"

# Push to GitHub
git push origin main
```

### 2. Set Vercel Environment Variables

**IMPORTANT:** Before the CMS will work, add these to Vercel:

1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Add these variables:
   - **GITHUB_CLIENT_ID**: `Ov23lixZFosIQZUioVff`
   - **GITHUB_CLIENT_SECRET**: `120664c90f10837868cab6fc93bfc5efcb97956d`
3. Select all environments (Production, Preview, Development)
4. Click "Save"

### 3. Wait for Deployment

Vercel will automatically:

- Detect the push to `main`
- Run `npm run build`
- Deploy the updated site with the admin files
- Deploy the OAuth API endpoints

### 4. Test the CMS

Once deployed:

1. Visit: https://helenburgess.id.au/admin/
2. Click "Login with GitHub"
3. Authorize the app
4. Start managing content!

## Troubleshooting

### "404 on config.yml"

- Wait for Vercel deployment to complete
- Check the deployment logs in Vercel dashboard
- Verify `admin/` directory is in the deployed files

### "OAuth Error"

- Verify environment variables are set in Vercel
- Check GitHub OAuth app callback URL is: `https://helenburgess.id.au/api/callback`
- Ensure you're using the correct Client ID and Secret

### "Not Authorized"

- Make sure you have access to the `hlnb/helenbee-site` repository
- Try logging out of GitHub and back in
- Check the browser console for detailed error messages

## Local Testing

If you want to test locally before deploying:

```bash
# Install Decap CMS local server
npm install -D decap-server

# Start the local proxy
npx decap-server
```

Then in `admin/config.yml`, temporarily add at the top:

```yaml
local_backend: true
```

Remember to remove `local_backend: true` before pushing to production!
