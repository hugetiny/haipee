# Multi-Cloud Deployment Status

## Deployment Summary

| Platform | Status | URL | Cost |
|----------|--------|-----|------|
| **Vercel** | ✅ Active | https://haipee.vercel.app | Free |
| **Cloudflare Pages** | ✅ Active | https://haipee.pages.dev | Free |
| **Tencent EdgeOne** | ✅ Active | https://haipee-qdq2olpm.edgeone.cool | Free |
| ~~Aliyun OSS~~ | ❌ Removed | - | - |
| ~~Aliyun ESA~~ | ❌ Removed | - | - |

---

## Active Deployments

### Vercel ✅

**Production URL:** https://haipee.vercel.app

**Project:** hugetinys-projects/haipee

**Deployment Method:** Git Integration (Auto-deploy)
- Vercel is connected via GitHub integration
- Automatically deploys on push to main
- No GitHub Actions deployment needed

**Manual Deployment (if needed):**
```bash
npx vercel build --token=$VERCEL_TOKEN --yes --prod
npx vercel deploy --prebuilt --token=$VERCEL_TOKEN --yes --prod
```

**Note:** Deployment Protection is enabled (authentication required for preview URLs).

---

### Cloudflare Pages ✅

**Production URL:** https://haipee.pages.dev

**Project:** haipee

**Deployment Method:** Git Integration (Auto-deploy)
- Cloudflare Pages is connected via GitHub integration
- Automatically deploys on push to main
- No GitHub Actions deployment needed

**Manual Deployment (if needed):**
```bash
npx wrangler pages deploy dist --project-name=haipee --commit-dirty=true
```

---

### Tencent EdgeOne Pages ✅

**Project ID:** `pages-dksyocssqsns`

**Deployment URL:** https://haipee-qdq2olpm.edgeone.cool

**Console:** https://console.cloud.tencent.com/edgeone/pages/project/pages-dksyocssqsns

**Deployment Method:** GitHub Integration (Auto-deploy)
- EdgeOne is connected via GitHub App
- Automatically deploys on push to main
- No manual workflow deployment needed

**Alternative Manual Deployment:**
```bash
edgeone pages deploy ./dist --name "haipee" --env production --area global
```

**Note:** Currently returns 401 - needs to be set to public access in EdgeOne console.

---

## GCore DNS Configuration

### Dynamic RRsets Setup

Configure GCore DNS with 3 backends:

| 地理位置 | 目标 | 说明 |
|---------|------|------|
| **中国大陆** | `haipee-qdq2olpm.edgeone.cool` | EdgeOne 香港/台湾节点 |
| **亚太其他地区** | `haipee-qdq2olpm.edgeone.cool` | EdgeOne |
| **北美** | `haipee.vercel.app` | Vercel |
| **欧洲** | `haipee.pages.dev` | Cloudflare |
| **默认/其他** | `haipee.pages.dev` | Cloudflare |

### Health Check URLs

- Vercel: `https://haipee.vercel.app/index.html`
- Cloudflare: `https://haipee.pages.dev/index.html`
- EdgeOne: `https://haipee-qdq2olpm.edgeone.cool/index.html`

---

## Deployment Architecture

| Platform | Method | Trigger |
|----------|--------|---------|
| **Vercel** | Git Integration | Auto on push to main |
| **Cloudflare Pages** | Git Integration | Auto on push to main |
| **EdgeOne** | Git Integration | Auto on push to main |

All three platforms use native Git integration. No GitHub Actions required.

---

## Quick Deployment

### Automatic (Recommended)
Just push to main branch - all platforms will deploy automatically:
```bash
git push origin main
```

### Manual Deployment (if needed)

```bash
# Deploy to all platforms manually
./deploy.sh

# Or deploy to specific platform:

# Vercel
npx vercel build --token=$VERCEL_TOKEN --yes --prod
npx vercel deploy --prebuilt --token=$VERCEL_TOKEN --yes --prod

# Cloudflare
npx wrangler pages deploy dist --project-name=haipee --commit-dirty=true

# Tencent EdgeOne
edgeone pages deploy ./dist --name "haipee" --env production --area global
```

---

## Environment Variables

### Local Development (`.env`)

```bash
# Vercel (for manual deployment)
VERCEL_TOKEN=xxx
VERCEL_ORG_ID=xxx
VERCEL_PROJECT_ID=xxx

# Cloudflare (for manual deployment)
CLOUDFLARE_API_TOKEN=xxx
CLOUDFLARE_ACCOUNT_ID=xxx

# Tencent EdgeOne (optional, CLI uses login session)
# TENCENTCLOUD_SECRET_ID=xxx
# TENCENTCLOUD_SECRET_KEY=xxx
```

### GitHub Secrets

No GitHub Secrets required. All platforms use native Git integration for automatic deployment.

---

## Troubleshooting

### EdgeOne 401
- Go to https://console.cloud.tencent.com/edgeone/pages
- Find project "haipee"
- Disable "Access Authentication" or set to public

### Vercel Deployment Protection
- Preview URLs require authentication
- Production URL (haipee.vercel.app) should be accessible

---

## Removed Resources

### Aliyun OSS (Deleted)
- ~~Bucket: haipee-ai-site~~ ❌ Deleted

### Aliyun ESA (Deleted)
- ~~Site: haipee.com~~ ❌ Deleted
- ~~Site ID: 1162602234989040~~ ❌ Deleted

