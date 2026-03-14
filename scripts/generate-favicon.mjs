#!/usr/bin/env node
/**
 * Generate favicon files from SVG logo
 * Supports 90%+ browser compatibility
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SOURCE_SVG = './public/logo-robot.svg';
const OUTPUT_DIR = './public';

async function generateFavicons() {
  console.log('🎨 Generating favicon files...\n');

  // Read SVG
  const svgBuffer = fs.readFileSync(SOURCE_SVG);

  // 1. Generate PNG favicons
  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' },
  ];

  for (const { size, name } of sizes) {
    await sharp(svgBuffer, { density: 300 })
      .resize(size, size, { fit: 'contain', background: { r: 2, g: 8, b: 4, alpha: 1 } })
      .png()
      .toFile(path.join(OUTPUT_DIR, name));
    console.log(`✓ ${name} (${size}x${size})`);
  }

  // 2. Generate ICO (multi-resolution)
  // ICO is a container format, we'll use the 32x32 PNG as base
  // For true ICO, we'd need a library like to-ico, but PNG works for most cases
  // Instead, let's copy 32x32 to favicon.png and use SVG as primary

  // Copy favicon-32x32.png to favicon.png for legacy browsers
  fs.copyFileSync(
    path.join(OUTPUT_DIR, 'favicon-32x32.png'),
    path.join(OUTPUT_DIR, 'favicon.png')
  );
  console.log('✓ favicon.png (legacy fallback)');

  // 3. Create webmanifest
  const manifest = {
    name: 'Haipee AI',
    short_name: 'Haipee',
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    theme_color: '#020804',
    background_color: '#020804',
    display: 'standalone',
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('✓ site.webmanifest');

  console.log('\n🎉 Favicon generation complete!');
  console.log('\nBrowser compatibility:');
  console.log('  • SVG: Chrome 80+, Firefox 41+, Safari 9+ (90%+)');
  console.log('  • PNG fallback: All browsers (100%)');
  console.log('  • Apple Touch: iOS Safari, macOS Safari');
  console.log('  • Web Manifest: Chrome, Edge, Firefox, Safari');
}

generateFavicons().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
