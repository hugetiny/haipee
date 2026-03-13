#!/bin/bash
# Setup script for Aliyun ESA and Tencent EdgeOne deployment
# This script helps configure the Chinese cloud providers for the Haipee AI website

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "======================================"
echo "🔧 China Cloud Deployment Setup"
echo "======================================"
echo ""

# Check for .env file
if [ ! -f "$PROJECT_DIR/.env" ]; then
  echo "⚠️  .env file not found at $PROJECT_DIR/.env"
  echo "Creating from template..."
  cat > "$PROJECT_DIR/.env" << 'EOF'
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
CLOUDFLARE_API_TOKEN=your_cf_token
CLOUDFLARE_EMAIL=your_email

# Tencent Cloud - Required for EdgeOne��Get from https://console.cloud.tencent.com/cam/capi
TENCENTCLOUD_SECRET_ID=your_secret_id
TENCENTCLOUD_SECRET_KEY=your_secret_key

# Aliyun - Required for ESA
# Get from https://ram.console.aliyun.com/manage/ak
ALIBABA_CLOUD_ACCESS_KEY_ID=your_access_key_id
ALIBABA_CLOUD_ACCESS_KEY_SECRET=your_access_key_secret
EOF
  echo "Created .env file. Please edit it with your actual credentials."
  exit 1
fi

# Source the .env file
export $(grep -v '^#' "$PROJECT_DIR/.env" | xargs)

echo "Step 1: Checking prerequisites..."
echo ""

# Check for required CLIs
check_cli() {
  local cmd=$1
  local install_url=$2
  if command -v "$cmd" &> /dev/null; then
    echo "  ✓ $cmd is installed"
    return 0
  else
    echo "  ✗ $cmd is not installed"
    echo "    Install from: $install_url"
    return 1
  fi
}

ALIYUN_OK=false
EDGEONE_OK=false
ESA_OK=false

if check_cli "aliyun" "https://www.alibabacloud.com/help/en/cli/installation-guide"; then
  ALIYUN_OK=true
fi

if check_cli "edgeone" "https://www.npmjs.com/package/edgeone"; then
  EDGEONE_OK=true
fi

if check_cli "esa-cli" "https://www.npmjs.com/package/@alicloud/esa-cli"; then
  ESA_OK=true
fi

echo ""
echo "Step 2: Checking credentials..."
echo ""

# Check Aliyun credentials
if [ "$ALIYUN_OK" = true ]; then
  echo "Checking Aliyun CLI configuration..."
  if aliyun sts GetCallerIdentity &> /dev/null; then
    echo "  ✓ Aliyun CLI is authenticated"
    ACCOUNT_ID=$(aliyun sts GetCallerIdentity | grep "AccountId" | sed 's/.*"AccountId": "\([^"]*\)".*/\1/')
    echo "    Account ID: $ACCOUNT_ID"

    # Check for ESA instances
    echo ""
    echo "Checking ESA instances..."
    INSTANCES=$(aliyun esa ListUserRatePlanInstances 2>/dev/null || echo "{}")
    INSTANCE_COUNT=$(echo "$INSTANCES" | grep -o '"InstanceId"' | wc -l || echo "0")

    if [ "$INSTANCE_COUNT" -gt 0 ]; then
      echo "  ✓ Found $INSTANCE_COUNT ESA instance(s)"
      echo "$INSTANCES" | grep '"InstanceId"' | head -3
    else
      echo "  ✗ No ESA instances found"
      echo "    You need to purchase an ESA instance at:"
      echo "    https://common-buy.aliyun.com/?commodityCode=esa"
    fi
  else
    echo "  ✗ Aliyun CLI is not authenticated"
    echo "    Run: aliyun configure"
  fi
fi

# Check EdgeOne credentials
if [ "$EDGEONE_OK" = true ]; then
  echo ""
  echo "Checking EdgeOne CLI configuration..."
  if edgeone whoami &> /dev/null; then
    echo "  ✓ EdgeOne CLI is authenticated"
  else
    echo "  ✗ EdgeOne CLI is not authenticated"
    echo "    Run: edgeone login"
  fi
fi

# Check ESA CLI credentials
if [ "$ESA_OK" = true ]; then
  echo ""
  echo "Checking ESA CLI configuration..."
  # ESA CLI doesn't have a whoami command, but we can check if it runs
  if esa-cli --version &> /dev/null; then
    echo "  ✓ ESA CLI is installed"
    echo "    Note: You may need to run 'esa-cli login' to authenticate"
  fi
fi

echo ""
echo "======================================"
echo "🔄 Next Steps"
echo "======================================"
echo ""

if [ "$EDGEONE_OK" = true ]; then
  echo "Deploy to Tencent EdgeOne:"
  echo "  cd $PROJECT_DIR"
  echo "  edgeone pages deploy ./dist --name 'haipee' --env production --area global"
  echo ""
fi

if [ "$ESA_OK" = true ]; then
  echo "Deploy to Aliyun ESA:"
  echo "  cd $PROJECT_DIR"
  echo "  esa-cli deploy ./dist --name 'haipee' --environment production"
  echo ""
elif [ "$ALIYUN_OK" = true ]; then
  echo "Deploy to Aliyun ESA (via aliyun CLI):"
  echo "  1. Create site: aliyun esa CreateSite --SiteName 'your-domain.com' --AccessType 'CNAME' --Coverage 'global' --InstanceId 'your-instance-id'"
  echo "  2. Upload to OSS: aliyun oss cp -r ./dist/ oss://your-bucket/"
  echo "  3. Configure origin in ESA console"
  echo ""
fi

echo "Or run the full deployment:"
echo "  cd $PROJECT_DIR"
echo "  ./deploy.sh"
echo ""
