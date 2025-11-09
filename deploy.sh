#!/bin/bash

# AWS Console Portfolio - Deployment Script
# Version: v3.1.0

set -e  # Exit on error

echo "🚀 AWS Console Portfolio - Static Deployment"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

# Step 2: Run linter
echo -e "${BLUE}🔍 Running linter...${NC}"
npm run lint

# Step 3: Build static export
echo -e "${BLUE}🏗️  Building static export...${NC}"
npm run build

# Step 4: Verify build
if [ -d "out" ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
    echo ""
    echo "📁 Static files generated in: ./out"
    echo ""
    
    # Count files
    FILE_COUNT=$(find out -type f | wc -l)
    DIR_SIZE=$(du -sh out | cut -f1)
    
    echo "📊 Build Statistics:"
    echo "   - Total files: $FILE_COUNT"
    echo "   - Total size: $DIR_SIZE"
    echo ""
    
    echo -e "${YELLOW}📋 Next Steps:${NC}"
    echo ""
    echo "For Nginx deployment:"
    echo "  1. Upload 'out' directory to your server"
    echo "  2. Configure Nginx using nginx.conf"
    echo "  3. Restart Nginx: sudo systemctl restart nginx"
    echo ""
    echo "For shared hosting:"
    echo "  1. Upload contents of 'out' directory to public_html"
    echo "  2. The .htaccess file is already included"
    echo ""
    echo "For local testing:"
    echo "  npx serve out"
    echo ""
    echo -e "${GREEN}🎉 Deployment package ready!${NC}"
else
    echo -e "${RED}❌ Build failed - 'out' directory not found${NC}"
    exit 1
fi