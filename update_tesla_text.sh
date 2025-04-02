#!/bin/bash

# Find all HTML files except index.html and about.html, which we've already updated
FILES=$(find . -name "*.html" | grep -v index.html | grep -v about.html)

# Update each file
for file in $FILES; do
  # Update the header logo section
  sed -i '' 's|<div class="logo">\n                <a href="index.html">\n                    <img src="images/tesla_logo.png" alt="Tesla Logo">\n                </a>\n            </div>|<div class="logo">\n                <a href="index.html">\n                    <img src="images/tesla_logo.png" alt="Tesla Logo">\n                    <span class="tesla-brand">TESLA</span>\n                </a>\n            </div>|g' "$file"
  
  # Update the footer logo section
  sed -i '' 's|<div class="footer-logo">\n                    <img src="images/tesla_logo.png" alt="Tesla Logo">\n                </div>|<div class="footer-logo">\n                    <img src="images/tesla_logo.png" alt="Tesla Logo">\n                    <span class="tesla-brand">TESLA</span>\n                </div>|g' "$file"
done

echo "All HTML files updated with TESLA text!"
