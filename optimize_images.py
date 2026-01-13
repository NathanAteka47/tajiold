"""
Image Optimization Script for Taji Website
This script compresses and optimizes images for web use.
Requires: pip install Pillow
"""

import os
from PIL import Image
import sys

def optimize_image(input_path, output_path=None, quality=85, max_size=(1920, 1920), format='WEBP'):
    """
    Optimize an image by compressing and resizing if needed.
    
    Args:
        input_path: Path to input image
        output_path: Path to save optimized image (default: same as input with .webp extension)
        quality: JPEG/WebP quality (1-100)
        max_size: Maximum dimensions (width, height)
        format: Output format ('WEBP', 'JPEG', 'PNG')
    """
    try:
        # Open image
        img = Image.open(input_path)
        
        # Convert RGBA to RGB if saving as JPEG
        if format == 'JPEG' and img.mode == 'RGBA':
            # Create white background
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[3] if len(img.split()) == 4 else None)
            img = rgb_img
        elif format == 'WEBP' and img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize if image is larger than max_size
        if img.size[0] > max_size[0] or img.size[1] > max_size[1]:
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
        
        # Determine output path
        if output_path is None:
            base_name = os.path.splitext(input_path)[0]
            if format == 'WEBP':
                output_path = f"{base_name}.webp"
            elif format == 'JPEG':
                output_path = f"{base_name}_optimized.jpg"
            else:
                output_path = f"{base_name}_optimized.png"
        
        # Save optimized image
        save_kwargs = {'quality': quality, 'optimize': True}
        if format == 'WEBP':
            save_kwargs['method'] = 6  # Best compression
        elif format == 'JPEG':
            save_kwargs['progressive'] = True
        
        img.save(output_path, format=format, **save_kwargs)
        
        # Get file sizes
        original_size = os.path.getsize(input_path)
        optimized_size = os.path.getsize(output_path)
        reduction = ((original_size - optimized_size) / original_size) * 100
        
        print(f"[OK] Optimized: {os.path.basename(input_path)}")
        print(f"  Original: {original_size / 1024:.1f} KB")
        print(f"  Optimized: {optimized_size / 1024:.1f} KB")
        print(f"  Reduction: {reduction:.1f}%")
        print(f"  Saved as: {os.path.basename(output_path)}\n")
        
        return output_path, original_size, optimized_size
        
    except Exception as e:
        print(f"[ERROR] Error optimizing {input_path}: {str(e)}\n")
        return None, 0, 0

def main():
    """Optimize the large images identified in the quality report."""
    
    # Large images to optimize
    images_to_optimize = [
        {
            'path': 'Resources/Offers/Fishy-goodness.png',
            'format': 'WEBP',
            'quality': 85,
            'max_size': (1200, 1200)  # Offers don't need to be huge
        },
        {
            'path': 'Resources/Offers/vibes.png',
            'format': 'WEBP',
            'quality': 85,
            'max_size': (1200, 1200)
        },
        {
            'path': 'Resources/Offers/Vegie Deal Alert.png',
            'format': 'WEBP',
            'quality': 85,
            'max_size': (1200, 1200)
        },
        {
            'path': 'Resources/Gallery/22.jpg',
            'format': 'WEBP',
            'quality': 85,
            'max_size': (1920, 1080)  # Background image
        }
    ]
    
    total_original = 0
    total_optimized = 0
    
    print("=" * 60)
    print("Taji Website Image Optimization")
    print("=" * 60)
    print()
    
    for img_config in images_to_optimize:
        input_path = img_config['path']
        
        if not os.path.exists(input_path):
            print(f"[ERROR] File not found: {input_path}\n")
            continue
        
        output_path, orig_size, opt_size = optimize_image(
            input_path,
            format=img_config['format'],
            quality=img_config['quality'],
            max_size=img_config['max_size']
        )
        
        if output_path:
            total_original += orig_size
            total_optimized += opt_size
    
    print("=" * 60)
    print("Summary")
    print("=" * 60)
    print(f"Total original size: {total_original / (1024*1024):.2f} MB")
    print(f"Total optimized size: {total_optimized / (1024*1024):.2f} MB")
    print(f"Total reduction: {((total_original - total_optimized) / total_original) * 100:.1f}%")
    print(f"Space saved: {(total_original - total_optimized) / (1024*1024):.2f} MB")
    print()
    print("Note: Update HTML/CSS files to use the optimized images.")
    print("=" * 60)

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nOptimization cancelled by user.")
        sys.exit(1)
    except Exception as e:
        print(f"\n\nError: {str(e)}")
        sys.exit(1)
