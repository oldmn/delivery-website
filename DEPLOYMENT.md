# GitHub Actions Deployment Workflows

This project includes three GitHub Actions deployment workflows for different hosting platforms. Choose the one that best fits your needs.

## Overview

Three deployment workflows have been configured:

- **Heroku**: Best for quick deployments, easy setup, integrated PostgreSQL/MongoDB
- **AWS**: Best for scalability, complex infrastructure, multiple services
- **Vercel**: Best for serverless deployments, frontend-heavy applications

## Setup Instructions

### Common Prerequisites

1. **GitHub Secrets**: Configure the following in your GitHub repository settings (`Settings > Secrets and variables > Actions`)

### Option 1: Deploy to Heroku

**When to use**: Quick deployment, learning projects, small to medium apps

#### Setup Steps

1. **Create a Heroku Account**

   - Go to [heroku.com](https://www.heroku.com) and sign up
   - Verify your email

2. **Install Heroku CLI** (optional, for local testing)

   ```bash
   npm install -g heroku
   heroku login
   ```

3. **Create a Heroku App**

   ```bash
   heroku create delivery-website
   ```

4. **Get Your Credentials**

   ```bash
   heroku auth:token
   # Copy this token for HEROKU_API_KEY
   ```

5. **Add GitHub Secrets**

   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Add these secrets:
     - `HEROKU_API_KEY`: Your Heroku API token (from step 4)
     - `HEROKU_APP_NAME`: `delivery-website` (or your app name)
     - `HEROKU_EMAIL`: Your Heroku account email

6. **Configure Heroku Environment**

   ```bash
   heroku config:set NODE_ENV=production -a delivery-website
   heroku config:set MONGODB_URI=<your-mongodb-connection-string> -a delivery-website
   heroku config:set PORT=5000 -a delivery-website
   ```

7. **Add Procfile** (if not present)

   ```bash
   echo "web: npm start" > Procfile
   git add Procfile && git commit -m "Add Procfile for Heroku"
   ```

8. **Deploy**

   - Push to `main` branch to trigger automatic deployment:

   ```bash
   git push origin main
   ```

9. **Monitor Deployment**
   - Go to GitHub → Actions tab to see workflow status
   - View live logs in Heroku dashboard:
   ```bash
   heroku logs --tail -a delivery-website
   ```

#### Verify Deployment

```bash
# Your app is live at:
https://delivery-website.herokuapp.com

# Test health endpoint:
curl https://delivery-website.herokuapp.com/api/health
```

---

### Option 2: Deploy to AWS

**When to use**: Production apps, need scalability, complex infrastructure requirements

#### Setup Steps

1. **Create AWS Account**

   - Go to [aws.amazon.com](https://aws.amazon.com)
   - Create account and verify

2. **Set Up EC2 Instance**

   ```bash
   # Launch an EC2 instance (Ubuntu 22.04 LTS recommended)
   # Security group: Allow ports 22, 80, 443
   ```

3. **Install Node.js on EC2**

   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-public-ip
   curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

4. **Clone Repository on EC2**

   ```bash
   cd /var/www
   git clone https://github.com/oldmn/delivery-website.git
   cd delivery-website
   npm ci --production
   npm start
   ```

5. **Create S3 Bucket for Deployments**

   ```bash
   aws s3 mb s3://delivery-website-deployments --region us-east-1
   ```

6. **Create IAM User for CI/CD**

   - Go to AWS IAM console
   - Create a new user: `github-actions`
   - Attach policies: `AmazonS3FullAccess`, `AmazonEC2FullAccess`
   - Generate access key and secret

7. **Add GitHub Secrets**

   - `AWS_ACCESS_KEY_ID`: From IAM user
   - `AWS_SECRET_ACCESS_KEY`: From IAM user
   - `AWS_REGION`: `us-east-1` (or your region)
   - `AWS_S3_BUCKET`: Your S3 bucket name
   - `AWS_EC2_HOST`: Your EC2 public IP or domain
   - `AWS_EC2_USER`: `ubuntu` (for Ubuntu instances)
   - `AWS_EC2_DEPLOY_KEY`: Your EC2 private key content

8. **Configure Security**

   - Add EC2 instance public key to GitHub deploy keys
   - Restrict IAM user permissions to only S3 and EC2

9. **Deploy**
   ```bash
   git push origin main
   ```

#### Verify Deployment

```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@your-ec2-public-ip

# Check application status
pm2 status

# View logs
pm2 logs delivery-website

# Test health endpoint
curl http://your-ec2-public-ip/api/health
```

---

### Option 3: Deploy to Vercel

**When to use**: Serverless backend, full-stack app with Next.js, edge functions

#### Setup Steps

1. **Create Vercel Account**

   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Create Vercel Project**

   - Import your GitHub repo
   - Select project settings

3. **Get Credentials**

   - Go to Vercel dashboard → Settings → Tokens
   - Create access token

4. **Add GitHub Secrets**

   - `VERCEL_ORG_ID`: From Vercel dashboard
   - `VERCEL_PROJECT_ID`: From project settings
   - `VERCEL_TOKEN`: Your access token
   - `VERCEL_APP_URL`: Your Vercel app URL (e.g., `https://delivery-website.vercel.app`)

5. **Configure Environment Variables**

   - Go to Vercel dashboard → Settings → Environment Variables
   - Add: `MONGODB_URI`, `NODE_ENV=production`

6. **Deploy**
   ```bash
   git push origin main
   ```

#### Verify Deployment

```bash
# Your app is live at:
https://delivery-website.vercel.app

# Test health endpoint:
curl https://delivery-website.vercel.app/api/health
```

---

## Workflow Stages

All deployment workflows follow this pipeline:

1. **Test Stage** (runs on both Node 18.x and 20.x)

   - ✅ Install dependencies
   - ✅ Format check (Prettier)
   - ✅ Lint check (ESLint)
   - ✅ Run all tests (Jest)
   - ✅ Generate coverage reports

2. **Build Stage** (AWS only)

   - ✅ Build application
   - ✅ Create deployment package

3. **Deploy Stage**
   - ✅ Deploy to target platform
   - ✅ Run health checks
   - ✅ Notify status

## Health Check Endpoint

Workflows test the `/api/health` endpoint. Add this to your backend if not present:

```javascript
// backend/api/routes/health.js
const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  });
});

module.exports = router;

// In backend/api/app.js:
// app.use('/api/health', require('./routes/health'));
```

## Monitoring & Rollback

### Heroku

```bash
# View logs
heroku logs --tail -a delivery-website

# Rollback to previous version
heroku releases -a delivery-website
heroku rollback v5 -a delivery-website
```

### AWS

```bash
# SSH into instance
ssh -i key.pem ubuntu@your-ip

# Check app status
pm2 status

# Restart app
pm2 restart delivery-website

# View logs
pm2 logs delivery-website
```

### Vercel

- Dashboard automatically shows deployment history
- Click "Rollback" button on any previous deployment

## Environment Variables

### Common Variables

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/delivery-website
PORT=5000
```

### Platform-Specific

- **Heroku**: Use `heroku config:set` command
- **AWS**: Set via EC2 `.env` file or Secrets Manager
- **Vercel**: Set via dashboard or `vercel env`

## Troubleshooting

### Deployment Fails

1. Check GitHub Actions logs (Actions tab → workflow run)
2. Verify all secrets are configured correctly
3. Ensure environment variables are set on target platform
4. Check health endpoint returns 200 status

### Health Check Fails

1. Verify backend is running: `pm2 status` or `heroku ps`
2. Check logs for errors
3. Ensure MongoDB connection string is correct
4. Add `/api/health` route if missing

### Tests Fail in CI

1. Run tests locally: `npm test`
2. Check for timing issues (increase timeout in jest.config)
3. Verify mongodb-memory-server compatibility with Node version
4. Check coverage thresholds in package.json

## Disabling Auto-Deployment

To prevent automatic deployment on every push to `main`:

1. Edit workflow file (e.g., `deploy-heroku.yml`)
2. Change trigger:
   ```yaml
   on:
     workflow_dispatch: # Manual trigger only
   ```

## Next Steps

- [ ] Choose your deployment platform
- [ ] Follow setup instructions for selected platform
- [ ] Test manual deployment with `workflow_dispatch`
- [ ] Push to `main` to trigger automatic deployment
- [ ] Build frontend with React
- [ ] Add authentication (JWT/OAuth)
- [ ] Enhance test coverage

## Resources

- [Heroku Deployment Guide](https://devcenter.heroku.com/articles/deploying-nodejs)
- [AWS EC2 Best Practices](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
