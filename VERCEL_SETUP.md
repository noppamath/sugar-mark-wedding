# Vercel Deployment Guide

This guide walks you through deploying the Sugar & Mark Wedding website to Vercel.

## Why Vercel?

- **Supports Next.js perfectly** - Built by the creators of Next.js
- **Free tier** - Generous free hosting for projects like this
- **Auto-deploys** - Automatically deploys on every push to main
- **Custom domains** - Easy DNS configuration
- **Environment variables** - Secure credential management
- **API routes** - Our photo upload endpoints work out of the box

## Prerequisites

- GitHub account (to host the code repository)
- Vercel account (free at https://vercel.com)
- Google Cloud Storage bucket configured (see [GCP Setup](./GCP_SETUP.md))
- Service account credentials from GCP

## Step 1: Push Code to GitHub

1. **Create a new GitHub repository** named `sugar-mark-wedding`
   - Go to https://github.com/new
   - Repository name: `sugar-mark-wedding`
   - Description: "Sugar & Mark's Wedding Website - June 14, 2026"
   - Make it **Public**
   - Click "Create repository"

2. **Initialize git and push code** (run in project directory):
   ```bash
   git init
   git add .
   git commit -m "Initial wedding website commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sugar-mark-wedding.git
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 2: Connect to Vercel

1. **Sign up for Vercel** (free)
   - Go to https://vercel.com/signup
   - Connect with your GitHub account
   - Authorize Vercel to access your GitHub repositories

2. **Create new project**
   - Click "New Project" in Vercel dashboard
   - Select the `sugar-mark-wedding` repository
   - Accept default settings
   - Click "Deploy"

   The first deployment may take 2-5 minutes.

## Step 3: Configure Environment Variables

1. **In Vercel dashboard**, go to your project → Settings → Environment Variables

2. **Add all GCS credentials** from your service account JSON file:
   - `GCS_PROJECT_ID`: Your GCP project ID
   - `GCS_BUCKET_NAME`: `sugar-mark-wedding-photos`
   - `GCS_PRIVATE_KEY_ID`: From service account
   - `GCS_PRIVATE_KEY`: From service account (paste entire key)
   - `GCS_CLIENT_EMAIL`: From service account
   - `GCS_CLIENT_ID`: From service account
   - `GCS_AUTH_URI`: `https://accounts.google.com/o/oauth2/auth`
   - `GCS_TOKEN_URI`: `https://oauth2.googleapis.com/token`
   - `GCS_AUTH_PROVIDER_CERT_URL`: `https://www.googleapis.com/oauth2/v1/certs`
   - `NEXT_PUBLIC_MAX_FILE_SIZE`: `10485760`
   - `NEXT_PUBLIC_ALLOWED_FORMATS`: `image/jpeg,image/png,image/webp`

3. **Apply changes**
   - Vercel will automatically redeploy with new environment variables

## Step 4: Access Your Website

1. **Default Vercel URL**
   - After deployment completes, you'll get a URL like:
   - `https://sugar-mark-wedding.vercel.app`
   - Share this link with guests!

2. **Custom Domain** (optional)
   - Go to Settings → Domains
   - Add your custom domain (e.g., `sugarmarkwedding.com`)
   - Follow DNS setup instructions
   - SSL certificate is automatic

## Auto-Deployment

Every time you push to `main` branch on GitHub:
- Vercel automatically builds and deploys
- Takes ~2 minutes
- Live at your URL

To make changes:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

## Testing Photo Upload

1. Visit your website URL
2. Click "Upload Photos" in navigation
3. Select a photo (JPEG, PNG, or WebP)
4. Optionally enter your name
5. Click Upload

Photos should appear in the gallery within seconds!

## Troubleshooting

### Deployment fails?
- Check Build Logs in Vercel dashboard
- Verify all environment variables are set
- Ensure the `.env.local` file is in `.gitignore` (it is by default)

### Photos not uploading?
- Verify GCS bucket exists and is accessible
- Check that service account has correct permissions
- Ensure environment variables match exactly

### Domain not working?
- DNS changes can take 24-48 hours to propagate
- Verify DNS records match Vercel's instructions
- Test with `nslookup` or online DNS tools

## Getting Help

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GCS Docs: https://cloud.google.com/storage/docs

---

**Your website will be live in minutes!** 🎉
