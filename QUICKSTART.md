# Quick Start: Deploy Your Wedding Website in 30 Minutes

Get your Sugar & Mark wedding website live on the internet.

## What You'll Have

✅ Modern, responsive website with:
- Countdown timer to June 14, 2026
- Event schedule and timeline
- Venue information with amenities
- Ceremony details and order of service
- Photo gallery with real-time updates
- Guest photo upload portal

✅ Automatic photo uploads to Google Cloud Storage
✅ Deployed live on Vercel (free tier)
✅ Auto-deploys when you push code changes
✅ Custom domain support

## 5-Step Deployment Process

### Step 1: Google Cloud Setup (5 minutes)
Follow [GCP_SETUP.md](./GCP_SETUP.md):
- Create GCP project
- Create Cloud Storage bucket
- Create service account
- Get credentials JSON

### Step 2: Create GitHub Repository (2 minutes)
1. Go to https://github.com/new
2. Repository name: `sugar-mark-wedding`
3. Make it Public
4. Create repository

### Step 3: Push Code to GitHub (3 minutes)
```bash
cd c:\Users\noppa\git\ repos\sugar-mark-wedding
git init
git add .
git commit -m "Initial wedding website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sugar-mark-wedding.git
git push -u origin main
```

### Step 4: Connect to Vercel (5 minutes)
Follow [VERCEL_SETUP.md](./VERCEL_SETUP.md):
1. Sign up at https://vercel.com
2. Connect GitHub account
3. Create new project from your repository
4. Add environment variables
5. Deploy

### Step 5: Test & Share (10 minutes)
1. Visit your Vercel URL (e.g., `https://sugar-mark-wedding.vercel.app`)
2. Test all pages load correctly
3. Test photo upload
4. Share link with guests!

## That's It! 🎉

Your website is now live and guest photos will display in real-time.

## After Deployment

### Make Changes
Any changes you push to GitHub automatically deploy:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

### Add Custom Domain (optional)
In Vercel dashboard → Settings → Domains:
1. Add domain (e.g., `sugarmarkwedding.com`)
2. Update DNS records at your domain provider
3. Takes ~24-48 hours to go live

### View Photos
Photos are instantly visible in the gallery after upload.

## Troubleshooting

**Deploy fails?**
- Check Vercel dashboard for error messages
- Verify all environment variables are set correctly
- Ensure `.env.local` is NOT in git (it's in `.gitignore`)

**Photos not uploading?**
- Verify GCS bucket exists
- Check environment variables match exactly
- Try uploading a small image first

**Need help?**
- See [VERCEL_SETUP.md](./VERCEL_SETUP.md) for detailed instructions
- See [GCP_SETUP.md](./GCP_SETUP.md) for GCP issues

---

**You're ready to go live!** Start with [GCP_SETUP.md](./GCP_SETUP.md). ✨
