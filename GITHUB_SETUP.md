# 🔗 GitHub Actions Auto-Deploy Setup Guide

## ✅ Completed Steps

1. **GitHub Actions Workflow** - Created `.github/workflows/deploy.yml`
2. **Package.json Scripts** - Added deploy commands
3. **README.md** - Complete project documentation
4. **Git Push** - All changes pushed to GitHub

## 🔧 Required GitHub Secrets Setup

To enable automatic deployment, you need to add these secrets to your GitHub repository:

### 1. Go to GitHub Repository Settings
- Navigate to: https://github.com/litxtech/replit/settings/secrets/actions
- Click "New repository secret"

### 2. Add Required Secrets

#### VERCEL_TOKEN
- **Name**: `VERCEL_TOKEN`
- **Value**: Your Vercel API token
- **How to get**: 
  1. Go to https://vercel.com/account/tokens
  2. Create new token
  3. Copy the token value

#### VERCEL_ORG_ID
- **Name**: `VERCEL_ORG_ID`
- **Value**: Your Vercel organization ID
- **How to get**:
  1. Go to https://vercel.com/account
  2. Copy Organization ID from URL or settings

#### VERCEL_PROJECT_ID
- **Name**: `VERCEL_PROJECT_ID`
- **Value**: Your Vercel project ID
- **How to get**:
  1. Go to your project in Vercel dashboard
  2. Go to Settings → General
  3. Copy Project ID

## 🚀 How It Works

Once secrets are configured:

1. **Push to main branch** → Triggers GitHub Actions
2. **GitHub Actions** → Builds the project
3. **Vercel Deploy** → Automatically deploys to production
4. **Live Site** → Updates instantly

## 📋 Manual Commands

If you want to deploy manually:

```bash
# Quick deploy
npm run deploy

# GitHub push with auto-commit
npm run github:deploy
```

## 🔍 Check Status

- **GitHub Actions**: https://github.com/litxtech/replit/actions
- **Live Site**: https://replit-project-kln9w9ir3-litxtechcom.vercel.app
- **Vercel Dashboard**: https://vercel.com/litxtechcom/replit-project

## 🎉 Benefits

- ✅ **Automatic**: Every push deploys automatically
- ✅ **Fast**: Builds in ~2-3 minutes
- ✅ **Reliable**: GitHub Actions handles the process
- ✅ **Safe**: Only deploys from main branch
- ✅ **Transparent**: Full logs and status updates

---

**Next Step**: Add the 3 Vercel secrets to GitHub repository settings, then every push will auto-deploy! 🚀
