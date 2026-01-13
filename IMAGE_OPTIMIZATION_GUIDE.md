# Image Optimization Guide for Taji Website

## Overview
This guide provides instructions for optimizing the large images identified in the site quality monitoring report.

## Large Images Identified
1. **Fishy-goodness.png** - 1752 KB (1.75 MB)
2. **vibes.png** - 1648 KB (1.65 MB)
3. **Vegie Deal Alert.png** - 2093 KB (2.09 MB)
4. **22.jpg** - 1137 KB (1.14 MB)

## Optimization Steps

### Option 1: Using Online Tools (Recommended for Quick Fix)

1. **Squoosh (Google)**
   - Visit: https://squoosh.app/
   - Upload each image
   - Select WebP format
   - Quality: 80-85 (good balance)
   - Download optimized version
   - Replace original files

2. **TinyPNG / TinyJPG**
   - Visit: https://tinypng.com/ (for PNG) or https://tinyjpg.com/ (for JPG)
   - Upload images
   - Download compressed versions
   - Can reduce size by 50-70%

### Option 2: Using Command Line Tools

#### Using ImageMagick (if installed)
```bash
# Convert PNG to optimized WebP
magick Resources/Offers/Fishy-goodness.png -quality 85 Resources/Offers/Fishy-goodness.webp
magick Resources/Offers/vibes.png -quality 85 Resources/Offers/vibes.webp
magick Resources/Offers/Vegie\ Deal\ Alert.png -quality 85 Resources/Offers/Vegie\ Deal\ Alert.webp

# Convert JPG to optimized WebP
magick Resources/Gallery/22.jpg -quality 85 Resources/Gallery/22.webp
```

#### Using cwebp (WebP Tools)
```bash
# Install WebP tools first, then:
cwebp -q 85 Resources/Offers/Fishy-goodness.png -o Resources/Offers/Fishy-goodness.webp
cwebp -q 85 Resources/Offers/vibes.png -o Resources/Offers/vibes.webp
cwebp -q 85 "Resources/Offers/Vegie Deal Alert.png" -o "Resources/Offers/Vegie Deal Alert.webp"
cwebp -q 85 Resources/Gallery/22.jpg -o Resources/Gallery/22.webp
```

### Option 3: Using Node.js Script

Create a file `optimize-images.js`:
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToOptimize = [
  { input: 'Resources/Offers/Fishy-goodness.png', output: 'Resources/Offers/Fishy-goodness.webp' },
  { input: 'Resources/Offers/vibes.png', output: 'Resources/Offers/vibes.webp' },
  { input: 'Resources/Offers/Vegie Deal Alert.png', output: 'Resources/Offers/Vegie Deal Alert.webp' },
  { input: 'Resources/Gallery/22.jpg', output: 'Resources/Gallery/22.webp' }
];

async function optimizeImages() {
  for (const image of imagesToOptimize) {
    try {
      await sharp(image.input)
        .webp({ quality: 85 })
        .toFile(image.output);
      console.log(`✓ Optimized: ${image.output}`);
    } catch (error) {
      console.error(`✗ Error optimizing ${image.input}:`, error.message);
    }
  }
}

optimizeImages();
```

Run with: `node optimize-images.js` (requires: `npm install sharp`)

## Target File Sizes

After optimization, aim for:
- **Fishy-goodness.webp**: < 200 KB (from 1752 KB)
- **vibes.webp**: < 200 KB (from 1648 KB)
- **Vegie Deal Alert.webp**: < 250 KB (from 2093 KB)
- **22.webp**: < 150 KB (from 1137 KB)

**Total reduction: ~6.6 MB → ~800 KB (88% reduction)**

## Additional Optimizations

### 1. Responsive Images
The HTML has been updated to use `<picture>` elements with WebP fallbacks. This ensures:
- Modern browsers get WebP (smaller files)
- Older browsers get PNG/JPG fallbacks
- Lazy loading for better performance

### 2. Lazy Loading
All images now have `loading="lazy"` attribute, which means:
- Images load only when needed (as user scrolls)
- Faster initial page load
- Better mobile experience

### 3. Image Dimensions
Width and height attributes have been added to prevent layout shift:
- Better Core Web Vitals scores
- Smoother user experience

## Verification

After optimization, verify:
1. Images still look good (quality check)
2. File sizes are significantly reduced
3. Website loads faster (use PageSpeed Insights)
4. All images display correctly in different browsers

## Notes

- WebP format provides 25-35% better compression than PNG/JPG
- Quality setting of 80-85 maintains visual quality while reducing size
- The HTML code is already updated to use WebP with fallbacks
- Keep original PNG/JPG files as fallbacks for older browsers
