#!/bin/bash
set -e
# Load environment variables from .env if it exists
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "🚀 Building Hapi AI Website..."
bun run build
echo "✅ Build complete. Output is in ./dist directory."

echo "========================================="
echo "🌍 Deploying to Vercel..."
# Deploying dist directory to Vercel
bunx vercel deploy ./dist --prod --token=$VERCEL_TOKEN --yes

echo "========================================="
echo "🌍 Deploying to Cloudflare Pages..."
bunx wrangler pages deploy dist --project-name=hapi-ai-website --commit-dirty=true

echo "========================================="
echo "ℹ️ EdgeOne & Aliyun ESA Deployment:"
echo "Please upload the './dist' folder or configure CI/CD for Tencent EdgeOne and Aliyun ESA as per GSLB_SETUP.md"
echo "========================================="
echo "🎉 Multi-Cloud Deployment Triggered Successfully."
