# Deployment Guide - AWS Console Portfolio v4.0.2

This guide covers deploying your Next.js portfolio as a static site to Nginx or shared hosting.

## 📦 Build for Production

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Static Export
```bash
npm run build
```

This will create an `out` directory with all static files ready for deployment.

### 3. Test Locally (Optional)
```bash
# Install a simple HTTP server
npm install -g serve

# Serve the static files
serve out
```

Visit `http://localhost:3000` to test the build.

---

## 🚀 Deployment Options

### Option 1: Nginx Server

#### Step 1: Upload Files
Upload the entire `out` directory to your server:
```bash
scp -r out/* user@your-server:/var/www/portfolio/
```

#### Step 2: Configure Nginx
Use the provided `nginx.conf` configuration file or add this to your Nginx config:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    root /var/www/portfolio;
    index index.html;
    
    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle client-side routing
    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### Step 3: Restart Nginx
```bash
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

---

### Option 2: Shared Hosting (cPanel, etc.)

#### Step 1: Build Locally
```bash
npm run build
```

#### Step 2: Upload via FTP/SFTP
- Upload all files from the `out` directory to your `public_html` or `www` directory
- Make sure to upload the `.htaccess` file (provided)

#### Step 3: Configure .htaccess
The `.htaccess` file is already included in the `out` directory for proper routing.

---

### Option 3: GitHub Pages

#### Step 1: Update package.json
Add to your `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/repository-name"
}
```

#### Step 2: Deploy
```bash
npm run build
# Push the 'out' directory to gh-pages branch
```

---

### Option 4: Netlify

#### Step 1: Connect Repository
- Connect your GitHub repository to Netlify

#### Step 2: Configure Build Settings
- Build command: `npm run build`
- Publish directory: `out`

#### Step 3: Deploy
Netlify will automatically deploy on every push to main branch.

---

### Option 5: Vercel (Recommended for Next.js)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
vercel
```

Follow the prompts to deploy. Vercel automatically detects Next.js configuration.

---

## 🔧 Environment Variables

If you add environment variables later, create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GITHUB_TOKEN=your_token_here
```

**Note:** For static export, all environment variables must be prefixed with `NEXT_PUBLIC_`

---

## 📝 Post-Deployment Checklist

- [ ] Test all pages (/, /changelog, /404)
- [ ] Verify theme switcher works
- [ ] Test language selector
- [ ] Check mobile responsiveness
- [ ] Verify all links work
- [ ] Test drag-and-drop functionality
- [ ] Check console for errors
- [ ] Test on different browsers
- [ ] Verify SSL certificate (if using HTTPS)
- [ ] Test loading speed

---

## 🐛 Troubleshooting

### Issue: 404 on page refresh
**Solution:** Ensure your server is configured to serve `index.html` for all routes (see Nginx config above)

### Issue: Assets not loading
**Solution:** Check that the `basePath` in `next.config.ts` matches your deployment path

### Issue: Styles not applying
**Solution:** Clear browser cache and ensure CSS files are being served correctly

### Issue: JavaScript not working
**Solution:** Check browser console for errors and ensure all JS files are loaded

---

## 🔄 Updating Your Site

1. Make changes to your code
2. Run `npm run build`
3. Upload the new `out` directory to your server
4. Clear browser cache if needed

---

## 📊 Performance Optimization

The static build includes:
- ✅ Minified JavaScript and CSS
- ✅ Optimized images (unoptimized flag for compatibility)
- ✅ Tree-shaken code
- ✅ Gzip compression (when configured)
- ✅ Browser caching headers

---

## 🆘 Support

For issues or questions:
- Check Next.js Static Export docs: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- Review this project's GitHub issues
- Check the Changelog for recent updates

---

**Version:** v4.0.2  
**Last Updated:** 2025-01-09