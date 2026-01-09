# Delivery Website

A full-stack delivery tracking application with Express backend, React frontend, comprehensive testing, and production-ready deployment workflows.

## 📋 Project Structure

```
delivery-website/
├── backend/
│   ├── api/
│   │   ├── models/        # Mongoose schemas (User, Product, Delivery)
│   │   ├── routes/        # Express route handlers with CRUD endpoints
│   │   └── app.js         # Express app setup
│   ├── test/              # Jest test suites (30 tests, 83%+ coverage)
│   └── server.js          # Server entry point
├── frontend/              # React components (to be built)
├── .github/workflows/     # GitHub Actions CI/CD pipelines
├── Procfile               # Heroku deployment config
├── vercel.json            # Vercel deployment config
├── DEPLOYMENT.md          # Complete deployment guide
└── package.json           # Dependencies and scripts
```

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start backend (development mode)
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run coverage

# Format code (Prettier)
npm run format

# Lint code (ESLint)
npm run lint
```

### Environment Setup

```bash
# Copy example configuration
cp .env.example .env

# Edit .env with your MongoDB URI
# Example: MONGODB_URI=mongodb://localhost:27017/delivery-website
```

## ✅ Backend Features

### API Endpoints

**Users**
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

**Products**
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

**Deliveries**
- `GET /api/deliveries` - List all deliveries
- `GET /api/deliveries/:id` - Get delivery by ID
- `POST /api/deliveries` - Create new delivery
- `PUT /api/deliveries/:id` - Update delivery
- `DELETE /api/deliveries/:id` - Delete delivery

**System**
- `GET /api/health` - Health check (database status, uptime)
- `GET /` - API running confirmation

### Models

- **User**: Email, name, contact, address validation
- **Product**: Name, description, price, quantity tracking
- **Delivery**: Status tracking, timestamps, user/product references

### Validation

- Schema validation with Mongoose
- Email format verification
- Required field enforcement
- Type checking for all fields

## 🧪 Testing & Quality

### Test Coverage: 83.78% Statements, 71.05% Branches

**Test Suites (5 total, 30 tests)**
- `users.test.js` - User CRUD and validation (6 tests)
- `products.test.js` - Product CRUD and validation (6 tests)
- `deliveries.test.js` - Delivery CRUD and validation (6 tests)
- `validation.test.js` - Schema validation and error handling (6 tests)
- `edgecases.test.js` - Edge cases and boundary conditions (6 tests)

### Code Quality

✅ **Prettier** - Consistent code formatting
✅ **ESLint** - Code quality and best practices (0 warnings policy)
✅ **Jest** - Comprehensive unit and integration tests
✅ **Coverage** - 80%+ threshold enforcement

## 🔄 CI/CD Pipelines

### Workflows

**test-coverage.yml** - Runs on every push
- Installs dependencies
- Prettier format check
- ESLint linting
- Jest test suite
- Coverage collection
- Uploads coverage artifact

**ci.yml** - Linting workflow

**deploy-heroku.yml** - Deploy to Heroku
- Test → Lint → Deploy → Health Check

**deploy-aws.yml** - Deploy to AWS
- Test → Build → Deploy → Health Check

**deploy-vercel.yml** - Deploy to Vercel
- Test → Deploy → Health Check

### CI Status

![Test and Coverage](https://github.com/oldmn/delivery-website/actions/workflows/test-coverage.yml/badge.svg)
![CI Clean](https://github.com/oldmn/delivery-website/actions/workflows/ci.yml/badge.svg)

View all workflows: https://github.com/oldmn/delivery-website/actions

## 🌐 Deployment

### Supported Platforms

- **Heroku** - Quick, easy, perfect for MVPs (free tier available)
- **AWS** - Production-ready, scalable infrastructure
- **Vercel** - Serverless, edge functions, full-stack ready

### Deploy Now

Choose your platform and follow the setup guide:

1. **Heroku (Recommended for quick start)**
   ```bash
   # Takes ~10 minutes to set up
   # See DEPLOYMENT.md for detailed instructions
   ```

2. **AWS (Recommended for production)**
   ```bash
   # Takes ~30 minutes to set up
   # See DEPLOYMENT.md for detailed instructions
   ```

3. **Vercel (Recommended for full-stack)**
   ```bash
   # Takes ~15 minutes to set up
   # See DEPLOYMENT.md for detailed instructions
   ```

📖 **Complete Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) and [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)

## 📦 NPM Scripts

```bash
npm start              # Start production server
npm run dev            # Start development server (nodemon)
npm test               # Run tests (Jest)
npm run coverage       # Run tests with coverage report
npm run lint           # Lint code (ESLint, 0 warnings)
npm run lint:fix       # Auto-fix linting issues
npm run format         # Format code (Prettier)
npm run format:check   # Check formatting without changes
```

## 🔐 Environment Variables

See `.env.example` for complete list:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/delivery-website
```

For production deployments, configure in your hosting platform.

## 🛠️ Tech Stack

**Backend**
- Node.js 18.x / 20.x
- Express 4.18
- MongoDB + Mongoose 7.0
- Jest for testing
- Prettier & ESLint for code quality

**Frontend** (Ready to build)
- React 18.2
- React DOM 18.2

**DevOps**
- GitHub Actions (CI/CD)
- Docker (optional)
- Heroku / AWS / Vercel

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Complete deployment guide with platform-specific instructions
- [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md) - Quick setup summary
- [.env.example](./.env.example) - Environment variables reference

## 🎯 Next Steps

### Immediate
- [ ] Choose a deployment platform
- [ ] Follow DEPLOYMENT.md for setup
- [ ] Deploy backend to production
- [ ] Test health endpoint

### Short-term
- [ ] Build React frontend components
- [ ] Connect frontend to backend
- [ ] Add authentication (JWT/OAuth)
- [ ] Enhance error handling

### Medium-term
- [ ] Set up database backups
- [ ] Configure logging and monitoring
- [ ] Add API documentation (Swagger)
- [ ] Implement rate limiting

### Long-term
- [ ] Add advanced filtering/search
- [ ] Real-time updates (WebSockets)
- [ ] Performance optimization
- [ ] Auto-scaling configuration

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Run tests: `npm test`
4. Format code: `npm run format`
5. Commit and push
6. Create a pull request

Pre-commit hooks automatically run Prettier and lint checks.

## 📄 License

MIT

## 📞 Support

For issues or questions:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section
2. Review GitHub Actions logs
3. Check MongoDB connection string
4. Verify environment variables

---

**Status**: ✅ Production-ready backend with tests and deployment workflows
**Next**: Choose your deployment platform and follow DEPLOYMENT.md
