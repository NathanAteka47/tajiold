# Image Optimization Guide for Taji Website

## Overview
This guide documents the image optimization improvements made to reduce page load times and improve user experience.

## Optimizations Implemented

### 1. Image Compression
- **Large images optimized**: 4 images totaling 6.47 MB reduced to 0.78 MB (88% reduction)
  - `Fishy-goodness.png`: 1751.6 KB → 181.0 KB (89.7% reduction)
  - `vibes.png`: 1648.3 KB → 181.5 KB (89.0% reduction)
  - `Vegie Deal Alert.png`: 2093.2 KB → 195.5 KB (90.7% reduction)
  - `22.jpg`: 1137.2 KB → 239.6 KB (78.9% reduction)

### 2. Modern Image Formats
- Converted large PNG/JPEG images to WebP format
- Implemented `<picture>` elements with fallbacks for browser compatibility
- WebP provides 25-35% better compression than PNG/JPEG

### 3. Lazy Loading
- Added `loading="lazy"` attribute to all non-critical images
- Images load only when they're about to enter the viewport
- Reduces initial page load time significantly

### 4. Responsive Images
- Added `decoding="async"` for non-blocking image decoding
- Implemented proper `alt` attributes for accessibility
- Added width/height attributes to prevent layout shift

### 5. Performance Optimizations
- Preload hints for critical images (logo, hero images)
- DNS prefetch for external resources
- CSS background image optimization with WebP support

## How to Use the Optimization Script

### Prerequisites
```bash
pip install Pillow
```

### Running the Script
```bash
python optimize_images.py
```

The script will:
1. Compress and optimize specified images
2. Convert to WebP format
3. Resize images to appropriate dimensions
4. Generate optimized versions alongside originals

### Customizing the Script
Edit `optimize_images.py` to:
- Adjust quality settings (default: 85)
- Change maximum dimensions
- Add more images to optimize
- Change output format

## Best Practices for Future Images

### Before Adding New Images:
1. **Resize images** to the maximum size they'll be displayed (don't upload 4K images for 300px displays)
2. **Compress images** using tools like:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
   - [ImageOptim](https://imageoptim.com/)
3. **Use WebP format** when possible
4. **Add lazy loading** for images below the fold
5. **Include proper alt text** for accessibility

### Image Size Guidelines:
- **Hero images**: Max 1920x1080px, ~200-300 KB
- **Gallery images**: Max 1200x1200px, ~150-200 KB
- **Offer images**: Max 1200x1200px, ~150-200 KB
- **Thumbnails**: Max 400x400px, ~50-100 KB
- **Icons/Logos**: Max 200x200px, ~20-50 KB

## Browser Support

### WebP Support:
- Chrome: ✅ (since version 23)
- Firefox: ✅ (since version 65)
- Safari: ✅ (since version 14)
- Edge: ✅ (since version 18)
- IE: ❌ (fallback to PNG/JPEG)

The implementation includes automatic fallbacks for browsers that don't support WebP.

## Monitoring Performance

### Tools to Check:
1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
2. **GTmetrix**: https://gtmetrix.com/
3. **WebPageTest**: https://www.webpagetest.org/

### Key Metrics to Monitor:
- **Largest Contentful Paint (LCP)**: Should be < 2.5s
- **Total Page Size**: Should be < 3 MB
- **Image Optimization Score**: Should be 100/100

## Maintenance

### Monthly Tasks:
1. Review new images added to the site
2. Run optimization script on any large images
3. Check PageSpeed Insights for regressions
4. Update images that exceed size guidelines

### When Adding New Pages:
1. Use the same optimization techniques
2. Add lazy loading to all images
3. Use WebP with fallbacks
4. Test on mobile devices

## Troubleshooting

### Images not loading:
- Check file paths are correct
- Verify WebP files exist alongside originals
- Check browser console for errors

### Images still too large:
- Re-run optimization script with lower quality (70-80)
- Further reduce max_size dimensions
- Consider using responsive images with srcset

### Performance issues:
- Check if lazy loading is working (use DevTools Network tab)
- Verify preload hints are in place
- Consider using a CDN for image delivery

## Contact
For questions or issues with image optimization, refer to this guide or check the optimization script comments.
