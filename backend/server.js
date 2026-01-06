const app = require('./api/app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

connectDB();
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
