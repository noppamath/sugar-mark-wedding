# Sugar & Mark Wedding Website

A beautiful, responsive wedding website built with Next.js, React, and Tailwind CSS. Features include event schedule, venue information, ceremony details, photo gallery, and guest photo upload portal.

## 🎉 Features

- **📅 Schedule Page**: Timeline of wedding day events
- **📍 Venue Information**: Location, parking, accessibility details
- **💍 Ceremony Details**: Order of service, participants, special moments
- **📸 Photo Gallery**: Display guest-uploaded photos
- **📷 Photo Upload Portal**: Guests can upload and share their photos
- **⏳ Event Countdown**: Real-time countdown to the wedding day
- **📱 Responsive Design**: Works on mobile, tablet, and desktop
- **🎨 Beautiful UI**: Modern, elegant design with Tailwind CSS
- **☁️ Cloud Storage**: Photos stored on Google Cloud Storage
- **🚀 Automatic Deployment**: GitHub Actions CI/CD pipeline

## 🛠 Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Cloud Storage**: Google Cloud Storage
- **Icons**: Lucide React
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📋 Prerequisites

- Node.js 20+
- npm or yarn
- Git
- GitHub account
- Google Cloud Platform (GCP) account (for photo uploads)

## 🚀 Quick Start

### 1. Local Development

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Fill in your GCS credentials in .env.local

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the site.

### 2. Configure Google Cloud Storage

1. Create a GCP project: https://console.cloud.google.com
2. Create a Cloud Storage bucket
3. Create a service account and download the JSON key
4. Set environment variables in `.env.local`
5. Configure CORS on your bucket

### 3. Deploy to GitHub Pages

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick deployment:**

```bash
# Build the site
npm run build

# Push to GitHub
git add -A
git commit -m "Deploy wedding website"
git push origin main
```

GitHub Actions will automatically deploy your site to GitHub Pages.

## 📁 Project Structure

```
sugar-mark-wedding/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Home page
│   ├── schedule/page.tsx        # Schedule page
│   ├── venue/page.tsx           # Venue page
│   ├── ceremony/page.tsx        # Ceremony page
│   ├── gallery/page.tsx         # Photo gallery
│   ├── upload/page.tsx          # Photo upload
│   └── api/
│       ├── upload/route.ts      # Upload handler
│       └── photos/route.ts      # Photos list endpoint
│
├── components/                   # React components
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Footer
│   ├── PhotoCard.tsx            # Photo display component
│   ├── UploadForm.tsx           # Photo upload form
│   └── EventCountdown.tsx       # Countdown timer
│
├── public/
│   ├── data/
│   │   ├── schedule.json        # Event schedule
│   │   ├── venue.json           # Venue details
│   │   ├── ceremony.json        # Ceremony info
│   │   └── gallery-metadata.json # Photo metadata
│   └── CNAME                    # Custom domain (optional)
│
├── scripts/
│   ├── deploy.sh               # macOS/Linux deploy script
│   └── deploy.bat              # Windows deploy script
│
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions workflow
│
├── .env.example                 # Environment variables template
├── .env.local                   # Local environment variables (git-ignored)
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies
├── DEPLOYMENT.md                # Deployment guide
└── README.md                    # This file
```

## 🎨 Customization

### Update Event Details

Edit these JSON files to customize your wedding information:

- `public/data/schedule.json` - Add/edit events
- `public/data/venue.json` - Update venue details
- `public/data/ceremony.json` - Modify ceremony information

### Change Styling

- Colors and fonts: Edit `tailwind.config.ts`
- Component styles: Modify component files in `components/`
- Pages styles: Edit individual page files in `app/`

### Update Content

- Home page hero: Edit `app/page.tsx`
- Navigation: Update `components/Header.tsx`
- Footer: Modify `components/Footer.tsx`

## 📸 Photo Upload Configuration

### Enable Photo Uploads

1. Create a GCP project
2. Create a Cloud Storage bucket:
   - Name: `sugar-mark-wedding-photos`
   - Region: Select closest to your guests
   - Public read access
   - Enable CORS

3. Create a Service Account:
   - Generate JSON key
   - Grant Storage Object Admin role

4. Add credentials to GitHub Secrets and `.env.local`

### Photo Storage Structure

Photos are stored in Google Cloud Storage at:
```
gs://sugar-mark-wedding-photos/{timestamp}-{randomId}.{ext}
```

Metadata is saved in `public/data/gallery-metadata.json`

## 🔒 Security

- Environment variables are kept secret (use GitHub Secrets)
- GCS bucket is configured for public read access only
- Private key is never exposed in client-side code
- File uploads are validated (size, type)
- Rate limiting on upload endpoint (recommended)

## 🚀 Performance Optimization

- Next.js static export for GitHub Pages
- Image lazy loading in gallery
- Responsive images with Tailwind CSS
- Optimized bundle size
- CDN serving from GitHub Pages

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Build issues
```bash
# Clear cache and rebuild
rm -rf .next out node_modules package-lock.json
npm install
npm run build
```

### Environment variables not working
- Verify `.env.local` file exists
- Check variable names match those in code
- Restart dev server after changing .env.local
- For GitHub Actions, add secrets in repository settings

### Photos not uploading
- Verify GCS bucket exists and is public
- Check CORS configuration on bucket
- Verify service account has Storage Object Admin role
- Check browser console for error messages

### Custom domain not working
- Verify CNAME file exists in `public/CNAME`
- Check DNS records are correct
- Wait for DNS propagation (up to 48 hours)
- Clear browser cache

## 📞 Support

For issues or questions:
1. Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
2. Review GitHub Actions workflow logs
3. Check browser console for errors
4. Verify environment variables are configured

## 📄 License

This project is customized for Sugar & Mark's wedding. Feel free to use as a template for your own wedding website.

## 🎊 Have a Beautiful Wedding!

We hope this website helps make your special day even more memorable. Enjoy sharing these moments with your loved ones!

---

**Last Updated**: April 2026  
**Next.js Version**: 16+  
**Node.js Version**: 20+
