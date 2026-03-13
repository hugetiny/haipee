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

**Deployment Command:**
```bash
npx vercel build --token=$VERCEL_TOKEN --yes --prod
npx vercel deploy --prebuilt --token=$VERCEL_TOKEN --yes --prod
```

**Note:** Deployment Protection is enabled (authentication required for preview URLs).

---

### Cloudflare Pages ✅

**Production URL:** https://haipee.pages.dev

**Project:** haipee

**Deployment Command:**
```bash
npx wrangler pages deploy dist --project-name=haipee --commit-dirty=true
```

---

### Tencent EdgeOne Pages ✅

**Project ID:** `pages-dksyocssqsns`

**Deployment URL:** https://haipee-qdq2olpm.edgeone.cool

**Console:** https://console.cloud.tencent.com/edgeone/pages/project/pages-dksyocssqsns

**Deployment Command:**
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

## Quick Deployment

Deploy to all platforms:
```bash
./deploy.sh
```

Deploy to specific platform:

```bash
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

Required in `.env`:
```bash
# Vercel
VERCEL_TOKEN=xxx

# Cloudflare
CLOUDFLARE_API_TOKEN=xxx

# Tencent EdgeOne (optional, CLI uses login session)
# TENCENTCLOUD_SECRET_ID=xxx
# TENCENTCLOUD_SECRET_KEY=xxx
```

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

