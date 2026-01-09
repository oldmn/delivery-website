const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

module.exports = async () => {};

beforeAll(async () => {
  // Allow using a system MongoDB when e.g. testing old Node versions in CI
  if (process.env.USE_SYSTEM_MONGO === 'true') {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/delivery_test';
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // clean DB before tests
    const collections = Object.keys(mongoose.connection.collections);
    for (const name of collections) {
      await mongoose.connection.collections[name].deleteMany({});
    }
    return;
  }

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Do not clear DB between each test so test files can manage state across tests.
// The in-memory server is recreated per test file run, so the DB starts clean for each file.

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {await mongoServer.stop();}
});
