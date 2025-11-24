# Decap CMS Setup Guide

Your Eleventy site now has Decap CMS (formerly Netlify CMS) integrated with custom OAuth authentication.

## Setup Steps

### 1. Create GitHub OAuth Application

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: `Helen Burgess Site CMS`
   - **Homepage URL**: `https://helenburgess.id.au`
   - **Authorization callback URL**: `https://helenburgess.id.au/api/callback`
4. Click "Register application"
5. Note your **Client ID** and generate a **Client Secret**

### 2. Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:
   - **Name**: `GITHUB_CLIENT_ID` → **Value**: (your GitHub OAuth Client ID)
   - **Name**: `GITHUB_CLIENT_SECRET` → **Value**: (your GitHub OAuth Client Secret)
4. Make sure to set them for Production, Preview, and Development environments

### 3. Deploy to Vercel

```bash
git add .
git commit -m "Add Decap CMS with custom OAuth"
git push origin main
```

Vercel will automatically deploy your changes.

### 4. Install Dependencies

Before deploying, install the new dependency:

```bash
npm install
```

### 5. Access the CMS

Once deployed, visit: **https://helenburgess.id.au/admin/**

- Click "Login with GitHub"
- Authorize the application
- Start creating and editing content!

## File Structure

```
admin/
  ├── index.html          # CMS entry point
  └── config.yml          # CMS configuration

api/
  ├── auth.js            # OAuth token exchange
  └── callback.js        # OAuth callback handler

assets/images/uploads/   # Media upload directory
```

## How It Works

1. User clicks "Login with GitHub" in the CMS
2. GitHub OAuth redirects to `/api/callback`
3. The callback handler sends the code to `/api/auth`
4. The auth endpoint exchanges the code for an access token
5. The CMS receives the token and authenticates the user

## Content Management

- **New posts** are created in: `src/writings/YYYY/MM/YYYY-MM-DD-slug.md`
- **Uploaded images** are stored in: `assets/images/uploads/`
- **Editorial workflow** is enabled (draft → in review → ready)

## Local Development

For local development, you can use the Decap CMS local proxy:

```bash
npx decap-server
```

Then update `admin/config.yml` to use:

```yaml
local_backend: true
```

## Troubleshooting

### "Not Authorized" Error

- Check that your GitHub OAuth credentials are correct in Vercel
- Verify the callback URL matches exactly: `https://helenburgess.id.au/api/callback`
- Make sure you're logged into GitHub and have access to the repository

### Media Upload Issues

- Ensure the `assets/images/uploads/` directory exists
- Check that the directory has proper git tracking (`.gitkeep` file present)

### Changes Not Appearing

- Remember that Decap CMS creates pull requests when using editorial workflow
- Check the "Workflow" tab in the CMS to publish drafts
