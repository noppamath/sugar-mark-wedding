#!/bin/bash

# Wedding Website Deployment Script for macOS/Linux
# This script builds the Next.js application and pushes it to GitHub Pages

set -e

echo "🎊 Wedding Website Deployment Script"
echo "====================================="

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if GCS credentials are configured
if [ -z "$GCS_PROJECT_ID" ]; then
    echo "⚠️  Warning: GCS environment variables not set. Building without cloud storage access."
    echo "   Photos will not upload to production without proper GCS configuration."
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔨 Building Next.js application..."
npm run build

# Check if build was successful
if [ ! -d "out" ]; then
    echo "❌ Build failed: 'out' directory not created"
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""
echo "📋 Next steps:"
echo "   1. Push your changes to GitHub:"
echo "      git add -A"
echo "      git commit -m 'Deploy wedding website'"
echo "      git push origin main"
echo ""
echo "   2. GitHub Actions will automatically:"
echo "      - Build the site"
echo "      - Deploy to GitHub Pages"
echo ""
echo "   3. Your site will be live at:"
echo "      https://<your-username>.github.io/sugar-mark-wedding/"
echo ""
echo "💡 For custom domain setup:"
echo "   1. Add CNAME file: echo 'sugarmarkwedding.com' > public/CNAME"
echo "   2. Configure DNS records in your domain registrar"
echo "   3. Push changes and redeploy"
