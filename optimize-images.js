/**
 * Image Optimization Script for Taji Website
 * 
 * This script optimizes large images by converting them to WebP format
 * 
 * Requirements:
 *   npm install sharp
 * 
 * Usage:
 *   node optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Images to optimize with their target quality
const imagesToOptimize = [
  { 
    input: 'Resources/Offers/Fishy-goodness.png', 
    output: 'Resources/Offers/Fishy-goodness.webp',
    quality: 85,
    maxWidth: 1200
  },
  { 
    input: 'Resources/Offers/vibes.png', 
    output: 'Resources/Offers/vibes.webp',
    quality: 85,
    maxWidth: 1200
  },
  { 
    input: 'Resources/Offers/Vegie Deal Alert.png', 
    output: 'Resources/Offers/Vegie Deal Alert.webp',
    quality: 85,
    maxWidth: 1200
  },
  { 
    input: 'Resources/Gallery/22.jpg', 
    output: 'Resources/Gallery/22.webp',
    quality: 85,
    maxWidth: 1200
  }
];

async function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

async function optimizeImage(imageConfig) {
  const { input, output, quality, maxWidth } = imageConfig;
  
  // Check if input file exists
  if (!fs.existsSync(input)) {
    console.log(`⚠️  Skipping ${input} - file not found`);
    return null;
  }

  try {
    const originalSize = await getFileSize(input);
    console.log(`\n📸 Processing: ${input}`);
    console.log(`   Original size: ${formatBytes(originalSize)}`);

    // Create output directory if it doesn't exist
    const outputDir = path.dirname(output);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Optimize image
    let sharpInstance = sharp(input);
    
    // Resize if maxWidth is specified
    if (maxWidth) {
      sharpInstance = sharpInstance.resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    // Convert to WebP
    await sharpInstance
      .webp({ 
        quality: quality,
        effort: 6 // Higher effort = better compression but slower
      })
      .toFile(output);

    const newSize = await getFileSize(output);
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`   ✅ Optimized: ${output}`);
    console.log(`   New size: ${formatBytes(newSize)}`);
    console.log(`   Reduction: ${reduction}%`);
    
    return {
      input,
      output,
      originalSize,
      newSize,
      reduction: parseFloat(reduction)
    };
  } catch (error) {
    console.error(`   ❌ Error optimizing ${input}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log('=' .repeat(50));
  
  const results = [];
  
  for (const imageConfig of imagesToOptimize) {
    const result = await optimizeImage(imageConfig);
    if (result) {
      results.push(result);
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('\n📊 Optimization Summary:\n');
  
  if (results.length > 0) {
    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalNew = results.reduce((sum, r) => sum + r.newSize, 0);
    const totalReduction = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1);
    
    console.log(`Total original size: ${formatBytes(totalOriginal)}`);
    console.log(`Total optimized size: ${formatBytes(totalNew)}`);
    console.log(`Total reduction: ${totalReduction}%`);
    console.log(`Space saved: ${formatBytes(totalOriginal - totalNew)}`);
    
    console.log('\n✅ Optimization complete!');
    console.log('\n💡 Next steps:');
    console.log('   1. Verify images look good in a browser');
    console.log('   2. Test the website to ensure all images load correctly');
    console.log('   3. The HTML is already configured to use WebP with fallbacks');
  } else {
    console.log('⚠️  No images were optimized. Please check:');
    console.log('   1. Are the input files in the correct location?');
    console.log('   2. Is sharp installed? (npm install sharp)');
  }
}

// Check if sharp is installed
try {
  require('sharp');
  main().catch(console.error);
} catch (error) {
  console.error('\n❌ Error: sharp module not found!');
  console.error('\nPlease install sharp first:');
  console.error('   npm install sharp\n');
  process.exit(1);
}
