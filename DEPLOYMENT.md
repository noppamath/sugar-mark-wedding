# Wedding Website - Deployment Guide

## GitHub Pages Deployment

This website is configured to deploy to GitHub Pages automatically.

### Prerequisites

1. **GitHub Repository**: Your project must be pushed to a GitHub repository
2. **GitHub Pages Enabled**: Enable Pages in your repository settings (Settings → Pages → Build and deployment)
3. **Branch**: Set to deploy from `main` branch (recommended)

### Automatic Deployment (CI/CD)

The website uses GitHub Actions for continuous integration and deployment.

**How it works:**
1. Push code to the `main` branch
2. GitHub Actions automatically runs the workflow (`.github/workflows/deploy.yml`)
3. The workflow builds the Next.js app and deploys to GitHub Pages
4. Your site goes live at `https://<your-username>.github.io/<repo-name>/`

### Manual Deployment

#### macOS/Linux:
```bash
bash scripts/deploy.sh
```

#### Windows:
```bash
scripts\deploy.bat
```

### Environment Variables for Production

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

```
GCS_PROJECT_ID=your-gcp-project-id
GCS_BUCKET_NAME=sugar-mark-wedding-photos
GCS_PRIVATE_KEY_ID=your-key-id
GCS_PRIVATE_KEY=your-private-key
GCS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GCS_CLIENT_ID=your-client-id
GCS_AUTH_URI=https://accounts.google.com/o/oauth2/auth
GCS_TOKEN_URI=https://oauth2.googleapis.com/token
GCS_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
```

### Custom Domain Setup

To use a custom domain (e.g., sugarmarkwedding.com):

1. **Create CNAME file**:
   ```bash
   echo "sugarmarkwedding.com" > public/CNAME
   ```

2. **Configure DNS Records**:
   - Log into your domain registrar
   - Set up CNAME record pointing to `<your-username>.github.io`
   - Or use A records pointing to GitHub's IP addresses

3. **Enable HTTPS**:
   - GitHub will automatically provision an SSL certificate
   - Wait 15-20 minutes after DNS changes propagate

4. **Push and Deploy**:
   ```bash
   git add public/CNAME
   git commit -m "Configure custom domain"
   git push origin main
   ```

### Troubleshooting

**Site not updating:**
- Check GitHub Actions tab for build failures
- Verify branch is set to `main` in Pages settings
- Clear browser cache

**Custom domain not working:**
- Wait for DNS propagation (up to 48 hours)
- Verify CNAME file exists in `public/CNAME`
- Check DNS settings are correct

**Photos not uploading:**
- Verify GCS environment variables are set in GitHub Secrets
- Check GCS bucket exists and is configured for CORS
- Verify bucket is public read

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Export for static hosting
npm run export
```

### File Structure for Deployment

```
/ (root)
├── out/              # Generated static files (deployed to GitHub Pages)
├── app/              # Next.js app directory
├── components/       # React components
├── public/
│   ├── data/        # JSON data files
│   └── CNAME        # Custom domain file (if using custom domain)
├── .github/
│   └── workflows/
│       └── deploy.yml # GitHub Actions workflow
└── package.json
```

### Cost

- **GitHub Pages**: Free ✓
- **Google Cloud Storage**: Free tier (5GB storage, 1GB/month outbound) ✓
- **Custom Domain**: ~$10-15/year (from registrar)

### Need Help?

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
- [Google Cloud Storage](https://cloud.google.com/storage/docs)
