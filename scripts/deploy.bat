@echo off
REM Wedding Website Deployment Script for Windows
REM This script builds the Next.js application and pushes it to GitHub Pages

echo.
echo 🎊 Wedding Website Deployment Script
echo =====================================
echo.

REM Check if we're in the correct directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    exit /b 1
)

REM Check if GCS credentials are configured
if not defined GCS_PROJECT_ID (
    echo ⚠️  Warning: GCS environment variables not set. Building without cloud storage access.
    echo    Photos will not upload to production without proper GCS configuration.
)

echo.
echo 📦 Installing dependencies...
call npm install

echo.
echo 🔨 Building Next.js application...
call npm run build

REM Check if build was successful
if not exist "out" (
    echo ❌ Build failed: 'out' directory not created
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.
echo 📋 Next steps:
echo    1. Push your changes to GitHub:
echo       git add -A
echo       git commit -m "Deploy wedding website"
echo       git push origin main
echo.
echo    2. GitHub Actions will automatically:
echo       - Build the site
echo       - Deploy to GitHub Pages
echo.
echo    3. Your site will be live at:
echo       https://^<your-username^>.github.io/sugar-mark-wedding/
echo.
echo 💡 For custom domain setup:
echo    1. Add CNAME file with your domain
echo    2. Configure DNS records in your domain registrar
echo    3. Push changes and redeploy
echo.
pause
