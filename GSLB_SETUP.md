# Multi-Cloud & Global Server Load Balancing (GSLB) Setup

To achieve "zero vendor lock" and "multi-cloud load balancing" for the Hapi AI website across Vercel, Cloudflare, EdgeOne, and Aliyun ESA, follow this architecture:

## 1. Edge Node Preparation
Ensure the static site (`dist` folder) is deployed to all 4 platforms:
- **Vercel:** Automated via `deploy.sh`. Provides a Vercel URL.
- **Cloudflare Pages:** Automated via `deploy.sh`. Provides a `.pages.dev` URL.
- **Tencent EdgeOne:** Upload the `dist` folder to EdgeOne Pages, and obtain the resulting CNAME.
- **Aliyun ESA:** Upload the `dist` folder to Aliyun ESA (Edge Security Acceleration). Obtain the ESA CNAME.

## 2. Global DNS Routing (Primary Level)
Bind a single main domain (e.g., `www.hapi-ai.com`) using a smart DNS provider capable of health checks and latency-based routing (e.g., **Cloudflare Load Balancing** or **Aliyun Global Traffic Manager (GTM)**).

### A. Health Checks Setup
Configure the Global Load Balancer to send a GET request to `/index.html` on all 4 platform CNAME endpoints every 60 seconds. If any platform returns a 5xx error or times out, the DNS will automatically pull it out of the routing pool.

### B. Routing Strategy (Geolocation / Latency)
Create traffic steering rules:
- **Overseas / Global Traffic:** Route primarily to **Cloudflare Pages** and **Vercel** nodes.
- **Mainland China / APAC Traffic:** Route primarily to **Tencent EdgeOne** and **Aliyun ESA** nodes for the lowest latency.

### C. Failover
If `EdgeOne` experiences an outage in Asia, the DNS GTM will automatically resolve user queries to `Aliyun ESA` or a fallback `Cloudflare` node. This guarantees continuous availability completely aligned with the "No Vendor Lock" App philosophy.
