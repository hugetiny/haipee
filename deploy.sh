#!/bin/bash
set -e

# Load environment variables from .env if it exists
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "🚀 Building Haipee AI Website..."
bun run build
echo "✅ Build complete. Output is in ./dist directory."

echo ""
echo "========================================="
echo "🌍 Deploying to Vercel..."
echo "========================================="
if [ -n "$VERCEL_TOKEN" ]; then
  npx vercel build --token=$VERCEL_TOKEN --yes --prod
  npx vercel deploy --prebuilt --token=$VERCEL_TOKEN --yes --prod
else
  echo "⚠️ VERCEL_TOKEN not set, skipping Vercel deployment"
fi

echo ""
echo "========================================="
echo "🌍 Deploying to Cloudflare Pages..."
echo "========================================="
if [ -n "$CLOUDFLARE_API_TOKEN" ]; then
  CLOUDFLARE_API_KEY=$CLOUDFLARE_API_TOKEN npx wrangler pages deploy dist --project-name=haipee --commit-dirty=true
else
  echo "⚠️ CLOUDFLARE_API_TOKEN not set, skipping Cloudflare deployment"
fi

echo ""
echo "========================================="
echo "🌍 Deploying to Tencent EdgeOne Pages..."
echo "========================================="
if command -v edgeone &> /dev/null; then
  edgeone pages deploy ./dist --name "haipee" --env production --area global
else
  echo "⚠️ EdgeOne CLI not found. Install with: npm install -g edgeone"
fi

echo ""
echo "========================================="
echo "🎉 Deployment process completed!"
echo "========================================="
echo ""
echo "📋 Deployment URLs:"
echo "   Vercel:       https://haipee.vercel.app"
echo "   Cloudflare:   https://haipee.pages.dev"
echo "   EdgeOne:      https://haipee-qdq2olpm.edgeone.cool"
echo ""
