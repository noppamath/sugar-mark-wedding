# Setup Guide for Sugar & Mark Wedding Website

This guide walks you through setting up and deploying your wedding website.

## Step 1: Initial Setup (Already Done ✅)

The project has been initialized with:
- ✅ Next.js 16 with TypeScript
- ✅ Tailwind CSS for styling
- ✅ All necessary components and pages
- ✅ Google Cloud Storage integration
- ✅ GitHub Actions deployment workflow

## Step 2: Local Development Setup

### 2.1 Install Dependencies

You already have npm installed. Verify everything is working:

```bash
npm --version  # Should be 11.11.0 or higher
node --version # Should be 24.14.1 or higher
```

Dependencies are already installed in your project.

### 2.2 Run Development Server

```bash
cd c:\Users\noppa\git repos\sugar-mark-wedding
npm run dev
```

Visit `http://localhost:3000` to see your website.

## Step 3: Customize Your Wedding Information

### 3.1 Update Basic Info

Edit `public/data/schedule.json`:
- Replace event times and descriptions
- Customize locations
- Add your event timeline

Edit `public/data/venue.json`:
- Update venue name and address
- Add phone, email, and website
- Customize amenities and accessibility info

Edit `public/data/ceremony.json`:
- Update ceremony time and location
- Add participants (bride, groom, officiant, etc.)
- Customize special moments timeline
- Add traditions and notes

### 3.2 Update Website Text

Edit `app/page.tsx`:
- Change "Sugar & Mark" to your names
- Update welcome message
- Modify any content

Edit `components/Header.tsx`:
- Update navigation if needed

Edit `components/Footer.tsx`:
- Update contact information
- Add social media links if desired

## Step 4: Configure Google Cloud Storage (For Photo Uploads)

### 4.1 Create GCP Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project:
   - Click "Select a Project"
   - Click "NEW PROJECT"
   - Name: "sugar-mark-wedding"
   - Click "CREATE"

### 4.2 Create Storage Bucket

1. In Cloud Console, go to "Cloud Storage"
2. Click "CREATE BUCKET"
   - Name: `sugar-mark-wedding-photos`
   - Region: Choose closest to your guests
   - Location type: Region
   - Default storage class: Standard
   - Click "CREATE"

### 4.3 Configure Bucket CORS

1. Select your bucket
2. Go to "Configuration" tab
3. Click "EDIT CORS CONFIGURATION"
4. Add this configuration:

```json
[
  {
    "origin": ["https://<your-username>.github.io", "http://localhost:3000"],
    "method": ["GET", "HEAD", "DELETE", "PUT", "POST"],
    "responseHeader": ["Content-Type", "x-goog-meta-*"],
    "maxAgeSeconds": 3600
  }
]
```

5. Click "SAVE"

### 4.4 Create Service Account

1. Go to "Service Accounts" (in left menu under IAM & Admin)
2. Click "CREATE SERVICE ACCOUNT"
   - Service account name: "wedding-site"
   - Service account ID: auto-generated
   - Click "CREATE AND CONTINUE"

3. Grant roles:
   - Role: "Storage Object Admin"
   - Click "CONTINUE"
   - Click "DONE"

4. Create and download key:
   - Click on the service account you just created
   - Go to "KEYS" tab
   - Click "ADD KEY" → "Create new key"
   - Choose "JSON"
   - Click "CREATE"
   - A JSON file will download

### 4.5 Configure Environment Variables

#### Local Development:

1. Open `.env.local` in your project
2. Copy values from the downloaded JSON file:

```
GCS_PROJECT_ID=your-project-id
GCS_BUCKET_NAME=sugar-mark-wedding-photos
GCS_PRIVATE_KEY_ID=<private_key_id from JSON>
GCS_PRIVATE_KEY=<private_key from JSON>
GCS_CLIENT_EMAIL=<client_email from JSON>
GCS_CLIENT_ID=<client_id from JSON>
GCS_AUTH_URI=https://accounts.google.com/o/oauth2/auth
GCS_TOKEN_URI=https://oauth2.googleapis.com/token
GCS_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
```

3. Save the file

#### Test Local Upload:

```bash
npm run dev
```

Go to `http://localhost:3000/upload` and test uploading a photo.

## Step 5: Push to GitHub

### 5.1 Initialize Git Repository

```bash
cd c:\Users\noppa\git repos\sugar-mark-wedding
git add .
git commit -m "Initial wedding website commit"
```

### 5.2 Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Name: `sugar-mark-wedding`
4. Description: "Sugar & Mark's Wedding Website"
5. Public repository
6. Click "Create repository"

### 5.3 Connect and Push

```bash
git remote add origin https://github.com/<your-username>/sugar-mark-wedding.git
git branch -M main
git push -u origin main
```

## Step 6: Configure GitHub Pages

### 6.1 Enable GitHub Pages

1. Go to your repository on GitHub
2. Settings → Pages
3. Build and deployment:
   - Source: "GitHub Actions"
   - This will automatically use the workflow we created

### 6.2 Add Secrets for Production

1. Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add all these secrets (from your GCS JSON file):

```
GCS_PROJECT_ID
GCS_BUCKET_NAME
GCS_PRIVATE_KEY_ID
GCS_PRIVATE_KEY
GCS_CLIENT_EMAIL
GCS_CLIENT_ID
GCS_AUTH_URI
GCS_TOKEN_URI
GCS_AUTH_PROVIDER_CERT_URL
```

**Important**: The `GCS_PRIVATE_KEY` needs special handling because it contains newlines. Replace actual `\n` characters with literal `\n` strings in the value.

## Step 7: Deploy Your Website

### 7.1 Automatic Deployment

```bash
git push origin main
```

GitHub Actions will automatically:
1. Build your site
2. Run tests
3. Deploy to GitHub Pages

Check progress: Settings → Actions

### 7.2 Access Your Site

Your website will be available at:
```
https://<your-username>.github.io/sugar-mark-wedding/
```

## Step 8: Custom Domain (Optional)

To use `sugarmarkwedding.com`:

### 8.1 Add CNAME File

```bash
echo "sugarmarkwedding.com" > public/CNAME
git add public/CNAME
git commit -m "Add custom domain CNAME"
git push origin main
```

### 8.2 Configure DNS

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Add CNAME record:
   - Host: `@` or leave blank
   - Points to: `<your-username>.github.io`
3. Wait for DNS to propagate (15 minutes to 48 hours)

### 8.3 Enable HTTPS

1. Go to repository Settings → Pages
2. Check "Enforce HTTPS"
3. Wait for SSL certificate to be provisioned

## Step 9: Test Everything

### 9.1 Test All Pages

- ✅ Home page
- ✅ Schedule page
- ✅ Venue page
- ✅ Ceremony page
- ✅ Gallery page (should be empty initially)
- ✅ Upload page

### 9.2 Test Photo Upload

1. Go to `/upload`
2. Select a photo from your computer
3. Enter a guest name
4. Click "Upload Photo"
5. Check `/gallery` to see the uploaded photo

### 9.3 Test Mobile

Use your phone or browser dev tools (F12) to test responsive design.

## Step 10: Share with Guests

Send your guests the link:
```
https://sugarmarkwedding.com
or
https://<your-username>.github.io/sugar-mark-wedding/
```

Include instructions for uploading photos:
1. Go to "Share Photos" tab
2. Click "Select Photo" or drag & drop
3. Enter your name (optional)
4. Click "Upload Photo"
5. Photo appears in Gallery

## Troubleshooting

### Photos not uploading?
- Verify GCS bucket CORS is configured
- Check environment variables are set
- Verify service account has Storage Object Admin role
- Check browser console for specific errors

### Website not deploying?
- Check GitHub Actions tab for build errors
- Verify main branch is being used
- Check GitHub Pages settings

### Site looks broken?
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private window
- Check for JavaScript errors (F12 console)

## Getting Help

Refer to these files for more information:
- `README.md` - Project overview
- `DEPLOYMENT.md` - Deployment guide
- `.env.example` - Environment variables template

## Celebrating Your Day! 🎊

Your wedding website is now live and ready to capture memories with your guests. Have a beautiful and memorable wedding day!
