import os
import re

def remove_favicon_images():
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    # Patterns to match and remove favicon images in different sections
    # Navbar logo image: <img src="favicon.png" alt="Akshay AI Tools Logo">
    # Loader image: <img src="favicon.png" alt="Akshay AI Tools" class="loader-img">
    # Footer brand image: <img src="favicon.png" alt="Akshay AI Tools Logo">
    
    # Matches <img src="favicon.png" ...> tags
    img_pattern = re.compile(r'<img[^>]*src=["\']favicon\.png["\'][^>]*>', re.IGNORECASE)

    for file_path in html_files:
        if file_path == 'google67411ea27e1cf0e5.html':
            continue
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Count original images
        original_count = len(img_pattern.findall(content))
        
        if original_count > 0:
            # Remove all images that use favicon.png
            new_content = img_pattern.sub('', content)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"Removed {original_count} favicon images from {file_path}")
        else:
            print(f"No favicon images found in {file_path}")

if __name__ == "__main__":
    remove_favicon_images()
