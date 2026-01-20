# Coolify Deployment Guide

This guide explains how to deploy the Album Fotos application to a VPS using Coolify.

## Prerequisites

- Coolify installed on your VPS
- Domain name(s) configured (optional but recommended)
- Git repository with your code

## Deployment Options

### Option 1: Docker Compose (Recommended)

This is the simplest approach - deploy both services together using Docker Compose.

#### Steps:

1. **In Coolify Dashboard:**
   - Go to "Resources" → "Docker Compose"
   - Click "New Resource"
   - Connect your Git repository
   - Set the following:
     - **Docker Compose File**: `docker-compose.prod.yml`
     - **Environment Variables**: 
       ```
       VITE_API_URL=http://backend:80
       ```
     - **Port**: `80` (for frontend)

2. **Configure Volumes:**
   - Coolify will automatically create volumes for `photos_data` and `photos_json`
   - These persist your photos and index across deployments

3. **Domain Configuration (Optional):**
   - Add your domain in Coolify
   - Configure SSL/TLS certificates
   - The frontend will be accessible on port 80

4. **Deploy:**
   - Click "Deploy" and Coolify will build and start both services

#### How it works:
- Frontend (nginx) serves the React app and proxies `/api/*` and `/upload` to the backend
- Backend (FastAPI) handles API requests and file uploads
- Both services communicate via Docker network `album-fotos-network`
- Photos are stored in persistent volumes

---

### Option 2: Separate Services (More Control)

Deploy frontend and backend as separate Coolify applications for more granular control.

#### Backend Service:

1. **Create New Application:**
   - Type: Docker
   - Source: Git Repository
   - Dockerfile: `backend/Dockerfile`
   - Port: `80`

2. **Environment Variables:**
   ```
   PHOTOS_ROOT=/app/photos
   ```

3. **Volumes:**
   - Mount persistent volume: `/app/photos` → `photos_data`
   - Mount persistent volume: `/app/photos.json` → `photos_json`

4. **Domain (Optional):**
   - Add domain: `api.yourdomain.com`
   - Enable SSL

#### Frontend Service:

1. **Create New Application:**
   - Type: Docker
   - Source: Git Repository
   - Dockerfile: `frontend/Dockerfile`
   - Build Args:
     ```
     VITE_API_URL=https://api.yourdomain.com
     ```
   - Port: `80`

2. **Update nginx.conf:**
   - If using separate domains, update `frontend/nginx.conf`:
     - Change `proxy_pass http://backend:80` to your backend URL
     - Or use environment variable substitution in nginx

3. **Domain:**
   - Add domain: `yourdomain.com` or `www.yourdomain.com`
   - Enable SSL

---

## Environment Variables

### Backend:
- `PHOTOS_ROOT`: Path to photos directory (default: `/app/photos`)

### Frontend:
- `VITE_API_URL`: Backend API URL (used during build)
  - For Docker Compose: `http://backend:80`
  - For separate services: `https://api.yourdomain.com`

## Important Notes

1. **Photo Storage:**
   - Photos are stored in Docker volumes
   - Back them up regularly: `docker volume inspect album-fotos_photos_data`
   - Consider mounting to host path for easier backups

2. **File Upload Limits:**
   - Nginx is configured with `client_max_body_size 100M`
   - Adjust in `frontend/nginx.conf` if needed

3. **CORS:**
   - Currently CORS is commented out in `backend/app/main.py`
   - If deploying separately, uncomment and configure CORS origins

4. **Health Checks:**
   - Both services have health checks configured
   - Coolify will automatically restart unhealthy containers

5. **Build Time vs Runtime:**
   - `VITE_API_URL` is a build-time variable
   - If you need to change it, rebuild the frontend image

## Troubleshooting

### Frontend can't reach backend:
- Check that both services are on the same network (Docker Compose) or backend URL is correct
- Verify backend is running: Check logs in Coolify
- Test backend directly: `curl https://api.yourdomain.com/api/photos`

### Photos not persisting:
- Verify volumes are mounted correctly
- Check volume permissions
- Ensure `photos.json` is in the correct volume

### Upload fails:
- Check nginx `client_max_body_size` setting
- Verify backend has write permissions to `/app/photos`
- Check backend logs for errors

## Recommended Setup

For production, use **Option 1 (Docker Compose)** with:
- Custom domain with SSL
- Regular volume backups
- Monitoring enabled in Coolify
- Resource limits configured

## Backup Strategy

```bash
# Backup photos volume
docker run --rm -v album-fotos_photos_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/photos-backup-$(date +%Y%m%d).tar.gz /data

# Backup photos.json
docker run --rm -v album-fotos_photos_json:/data -v $(pwd):/backup \
  alpine tar czf /backup/photos-json-backup-$(date +%Y%m%d).tar.gz /data
```
