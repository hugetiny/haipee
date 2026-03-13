# Multi-Cloud & Global Server Load Balancing (GSLB) Setup

To achieve "zero vendor lock" and "multi-cloud load balancing" for the Haipee AI website across Vercel, Cloudflare, EdgeOne, and Aliyun ESA, follow this architecture:

## 1. Edge Node Preparation

Ensure the static site (`dist` folder) is deployed to all 4 platforms:

### Vercel (Already Configured)
- **Status:** Automated via `deploy.sh`
- **Output:** Provides a `.vercel.app` URL
- **Setup:** Already configured with VERCEL_TOKEN in .env

### Cloudflare Pages (Already Configured)
- **Status:** Automated via `deploy.sh`
- **Output:** Provides a `.pages.dev` URL
- **Setup:** Uses Wrangler CLI with CLOUDFLARE_API_TOKEN

### Tencent EdgeOne Pages (Setup Required)

**Prerequisites:**
1. Install EdgeOne CLI: `npm install -g edgeone`
2. Login: `edgeone login` (select "China" for mainland China deployment)
3. Add credentials to `.env`:
   ```
   TENCENTCLOUD_SECRET_ID=your_secret_id
   TENCENTCLOUD_SECRET_KEY=your_secret_key
   ```

**Deployment Options:**

**Option A: Using EdgeOne CLI (Recommended)**
```bash
# Login (one-time)
edgeone login

# Deploy
cd /Users/a12/projects/skillhub/haipee-website
edgeone pages deploy ./dist --name "haipee" --env production --area global
```

**Option B: Via Console**
1. Go to https://console.cloud.tencent.com/edgeone/pages
2. Create new project "haipee"
3. Select "Direct Upload" as source
4. Upload the `dist` folder as a ZIP
5. Deploy to production

**Expected Output:**
- Site URL: `https://haipee-xxx.edgeone.app` (or custom domain)
- CNAME: Provided in EdgeOne console after deployment

### Aliyun ESA (Setup Required)

**Prerequisites:**
1. Install Aliyun CLI: https://www.alibabacloud.com/help/en/cli/installation-guide
2. Configure credentials: `aliyun configure`
3. Add credentials to `.env`:
   ```
   ALIBABA_CLOUD_ACCESS_KEY_ID=your_access_key_id
   ALIBABA_CLOUD_ACCESS_KEY_SECRET=your_access_key_secret
   ```

**ESA Site Setup:**

**Option A: Using ESA CLI (Recommended for Static Sites)**
```bash
# Install ESA CLI
npm install -g @alicloud/esa-cli

# Login
esa-cli login

# Initialize and deploy
cd /Users/a12/projects/skillhub/haipee-website
esa-cli deploy ./dist --name "haipee" --environment production
```

**Option B: Using Aliyun CLI**
```bash
# List available instances
aliyun esa ListUserRatePlanInstances

# Create a site (replace with your domain)
aliyun esa CreateSite \
  --SiteName "your-domain.com" \
  --AccessType "CNAME" \
  --Coverage "global" \
  --InstanceId "your-instance-id"

# Upload to OSS first (ESA can use OSS as origin)
aliyun oss cp -r ./dist/ oss://your-bucket-name/

# Configure ESA to use OSS origin via console
```

**Option C: Via Console**
1. Go to https://esa.console.aliyun.com/
2. Create a new site with your domain
3. Select "NS" or "CNAME" access type
4. For static hosting:
   - Upload files to OSS
   - Configure origin to point to OSS bucket
   - Or use ESA's static hosting feature directly

**Expected Output:**
- Site URL: `https://your-domain.com` (after DNS setup)
- CNAME: Provided in ESA console after site creation

## 2. Global DNS Routing (Primary Level)

Bind a single main domain (e.g., `www.haipee.com`) using a smart DNS provider capable of health checks and latency-based routing.

### Recommended DNS Providers:
- **Cloudflare Load Balancing:** Good for global distribution, easy health checks
- **Aliyun Global Traffic Manager (GTM):** Excellent for China + Global split
- **AWS Route 53:** Good integration with AWS ecosystem
- **NS1/IBM Cloud Internet Services:** Advanced traffic steering

### A. Health Checks Setup

Configure the Global Load Balancer to send a GET request to `/index.html` on all 4 platform endpoints every 60 seconds:

| Platform | Health Check URL |
|----------|-----------------|
| Vercel | `https://haipee.vercel.app/index.html` |
| Cloudflare | `https://haipee.pages.dev/index.html` |
| EdgeOne | `https://haipee-xxx.edgeone.app/index.html` |
| Aliyun ESA | `https://your-domain.com/index.html` |

**Health Check Criteria:**
- Expected HTTP status: 200
- Timeout: 5 seconds
- Interval: 60 seconds
- Failure threshold: 2 consecutive failures

### B. Routing Strategy (Geolocation / Latency)

Create traffic steering rules:

**Geolocation-Based Routing:**
```
Mainland China:
  Primary: Aliyun ESA (Beijing/Shanghai)
  Secondary: Tencent EdgeOne
  Tertiary: Cloudflare (Hong Kong)

Asia-Pacific (excluding China):
  Primary: Tencent EdgeOne (Singapore/Hong Kong)
  Secondary: Cloudflare (Singapore/Tokyo)
  Tertiary: Aliyun ESA (Hong Kong)

Americas/Europe:
  Primary: Cloudflare Pages
  Secondary: Vercel
  Tertiary: Tencent EdgeOne (Global)
```

**Latency-Based Routing:**
- Measure RTT from PoPs to each endpoint
- Route to lowest latency endpoint
- Fallback to next best on failure

### C. Failover Configuration

If any platform experiences an outage:
1. Health check detects failure (after 2 consecutive fails)
2. DNS stops returning that endpoint's IP
3. Traffic automatically routes to healthy endpoints
4. When platform recovers, traffic gradually returns (configured via TTL)

**Example Failover Chain:**
```
China Users:
  EdgeOne (Shanghai) → ESA (Shanghai) → ESA (Beijing) → Cloudflare (HK)

Global Users:
  Cloudflare (US) → Vercel (US) → EdgeOne (Global) → ESA (HK)
```

## 3. Monitoring & Alerting

Set up monitoring for all endpoints:

```bash
# Simple health check script (run via cron every minute)
#!/bin/bash
ENDPOINTS=(
  "https://haipee.vercel.app/health"
  "https://haipee.pages.dev/health"
  "https://haipee.edgeone.app/health"
  "https://haipee.esa.aliyun.com/health"
)

for endpoint in "${ENDPOINTS[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$endpoint")
  if [ "$status" != "200" ]; then
    echo "ALERT: $endpoint returned $status" | notify-send
  fi
done
```

## 4. Cost Optimization

Monitor costs across all platforms:

| Platform | Free Tier | Paid Trigger |
|----------|-----------|--------------|
| Vercel | 100GB bandwidth | Overages |
| Cloudflare | Unlimited | Workers usage |
| EdgeOne | 10GB/month | Bandwidth overages |
| Aliyun ESA | Instance-based | Traffic overages |

## 5. Deployment Checklist

Before going live:
- [ ] All 4 platforms deployed and returning 200
- [ ] Health checks configured and passing
- [ ] DNS routing rules tested
- [ ] Failover tested (simulate outage on each platform)
- [ ] SSL certificates valid on all endpoints
- [ ] CORS headers configured if needed
- [ ] SPA routing rules configured (all routes → index.html)

## Quick Deployment Commands

```bash
# Deploy to all platforms
./deploy.sh

# Deploy to specific platform only
# Vercel
npx vercel deploy ./dist --prod --token=$VERCEL_TOKEN --yes

# Cloudflare
npx wrangler pages deploy dist --project-name=haipee --commit-dirty=true

# Tencent EdgeOne
edgeone pages deploy ./dist --name "haipee" --env production

# Aliyun ESA
esa-cli deploy ./dist --name "haipee" --environment production
```

## Troubleshooting

### Vercel
- Issue: "vite: command not found"
- Solution: Vercel uses their own build environment. Ensure `package.json` has correct build command.

### Cloudflare
- Issue: 404 errors on SPA routes
- Solution: Add `_redirects` file in dist: `/* /index.html 200`

### Tencent EdgeOne
- Issue: "User.NotFound" error
- Solution: Run `edgeone login` and select correct region (China vs Global)

### Aliyun ESA
- Issue: Site name invalid
- Solution: ESA SiteName must be a valid domain name you own
- Issue: No instances available
- Solution: Purchase ESA instance at https://common-buy.aliyun.com/?commodityCode=esa
