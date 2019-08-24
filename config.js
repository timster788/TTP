require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  MONGODB_URI:
    process.env.MONGODB_URI ||
    'mongodb://heroku_qwsh37sh:5rd370ghjogfcso7jbd8ukiq8j@ds263917.mlab.com:63917/heroku_qwsh37sh',
  // TEST_DATABASE_URL:
  //   process.env.TEST_DATABASE_URL || 'mongodb://localhost/test',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || 15 * 60 * 1000
};
