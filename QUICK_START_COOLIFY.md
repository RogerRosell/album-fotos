# Quick Start: Deploy to Coolify

## Fastest Method (Recommended)

1. **In Coolify Dashboard:**
   - Go to "Resources" → "Docker Compose"
   - Click "New Resource"
   - Connect your Git repository
   - Set Docker Compose File: `docker-compose.prod.yml`
   - Deploy!

2. **That's it!** 
   - Frontend will be accessible on port 80
   - Nginx automatically proxies `/api/*` and `/upload` to backend
   - Photos are stored in persistent volumes

## What Was Set Up

✅ **Frontend Dockerfile** - Multi-stage build with nginx  
✅ **Production docker-compose.yml** - Both services configured  
✅ **Updated nginx.conf** - Proxies API and upload endpoints  
✅ **Relative URLs** - Frontend works with nginx proxy  
✅ **Health checks** - Automatic container monitoring  
✅ **Persistent volumes** - Photos survive deployments  

## Optional: Add Domain

1. In Coolify, add your domain
2. Enable SSL/TLS
3. Access via `https://yourdomain.com`

## For More Details

See [COOLIFY_DEPLOYMENT.md](./COOLIFY_DEPLOYMENT.md) for:
- Separate service deployment
- Environment variables
- Troubleshooting
- Backup strategies
