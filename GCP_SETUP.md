# Google Cloud Storage Setup

This guide helps you set up Google Cloud Storage (GCS) for photo uploads on the wedding website.

## Prerequisites

- Google account
- Credit card (for GCP free trial, though this project shouldn't incur costs)

## Step 1: Create a GCP Project

1. **Go to Google Cloud Console**
   - Visit https://console.cloud.google.com

2. **Create a new project**
   - Click the project dropdown at the top
   - Click "NEW PROJECT"
   - Project name: `sugar-mark-wedding`
   - Click "CREATE"
   - Wait for project to be created

## Step 2: Create Cloud Storage Bucket

1. **Open Cloud Storage**
   - In the left menu, go to Cloud Storage → Buckets
   - Click "CREATE BUCKET"

2. **Configure bucket**
   - Name: `sugar-mark-wedding-photos`
   - Location: Choose nearest to your guests (or "US" for multi-region)
   - Storage class: "Standard"
   - Leave other settings as default
   - Click "CREATE"

3. **Set up public access**
   - Click on the bucket name
   - Go to "Permissions" tab
   - Click "Grant Access"
   - Add new principal: `allUsers`
   - Role: "Storage Object Viewer"
   - Click "Save"

   This allows the website to display public photos.

4. **Configure CORS**
   - Open Cloud Shell (terminal icon at top right)
   - Run this command to allow uploads from your domain:

   ```bash
   gsutil cors set - gs://sugar-mark-wedding-photos << 'EOF'
   [
     {
       "origin": ["*"],
       "method": ["GET", "HEAD", "PUT", "POST", "DELETE"],
       "responseHeader": ["Content-Type"],
       "maxAgeSeconds": 3600
     }
   ]
   EOF
   ```

## Step 3: Create Service Account

1. **Create service account**
   - In left menu: IAM & Admin → Service Accounts
   - Click "CREATE SERVICE ACCOUNT"
   - Service account name: `wedding-uploader`
   - Click "CREATE AND CONTINUE"

2. **Grant permissions**
   - Role: "Storage Admin" (allows full bucket access)
   - Click "CONTINUE"
   - Click "DONE"

3. **Create key file**
   - Find the service account you just created
   - Click on it
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Key type: JSON
   - Click "CREATE"
   - A JSON file will download - **KEEP THIS SAFE**

## Step 4: Get Credentials for Vercel

The JSON file you downloaded contains all needed credentials:

```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "...",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

## Step 5: Set Environment Variables

Use these values when setting up Vercel (see [VERCEL_SETUP.md](./VERCEL_SETUP.md)):

- `GCS_PROJECT_ID` = `project_id`
- `GCS_BUCKET_NAME` = `sugar-mark-wedding-photos`
- `GCS_PRIVATE_KEY_ID` = `private_key_id`
- `GCS_PRIVATE_KEY` = `private_key` (entire multi-line value)
- `GCS_CLIENT_EMAIL` = `client_email`
- `GCS_CLIENT_ID` = `client_id`
- `GCS_AUTH_URI` = `https://accounts.google.com/o/oauth2/auth`
- `GCS_TOKEN_URI` = `https://oauth2.googleapis.com/token`
- `GCS_AUTH_PROVIDER_CERT_URL` = `https://www.googleapis.com/oauth2/v1/certs`

## Costs

**Good news:** This setup is FREE!

- **Cloud Storage**: 5 GB free per month (more than enough for wedding photos)
- **Storage Transfer**: Free
- **No charges** for the free tier unless you exceed limits

With 5 GB free monthly storage, you could store ~500 high-quality photos. Guests typically upload 100-200 during a wedding.

## Local Testing (Optional)

To test uploads locally before deploying:

1. **Download the service account JSON**
2. **Place it in project root** as `gcs-key.json`
3. **Set environment variables:**
   ```bash
   # Create .env.local file
   cp .env.example .env.local
   ```

4. **Fill in your GCS credentials in `.env.local`**
5. **Test with:** `npm run dev`

## Securing Credentials

⚠️ **IMPORTANT:**
- Never commit credentials to GitHub
- `.env.local` is in `.gitignore` - keep it that way
- Use Vercel's secure environment variables for production
- Regenerate the key if it's accidentally exposed

## Next Steps

Once this is set up, follow [VERCEL_SETUP.md](./VERCEL_SETUP.md) to deploy your website.

## Getting Help

- GCP Documentation: https://cloud.google.com/storage/docs
- Service Account Setup: https://cloud.google.com/docs/authentication/getting-started

---

**Ready to deploy!** Proceed to [VERCEL_SETUP.md](./VERCEL_SETUP.md) next.
