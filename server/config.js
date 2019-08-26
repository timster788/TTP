require('dotenv').config();

// module.exports = {
//   PORT: process.env.PORT || 8080,
//   CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
//   DATABASE_URL: process.env.DATABASE_URL || 'postgres://localhost/dev-ttp-stock',
//   // TEST_DATABASE_URL:
//   //   process.env.TEST_DATABASE_URL || 'mongodb://localhost/test',
//   JWT_SECRET: process.env.JWT_SECRET,
//   JWT_EXPIRY: process.env.JWT_EXPIRY || 15 * 60 * 1000
// };

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: 
        process.env.CLIENT_ORIGIN || 
        'http://localhost:3000',
  DATABASE_URL: 
        process.env.DATABASE_URL || 
        'postgres://localhost/dev-ttp-stock',
  TEST_DATABASE_URL:
        process.env.TEST_DATABASE_URL ||
        'postgres://localhost/localhost/dev-ttp-stock'
};