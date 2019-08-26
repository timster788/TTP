const createKnex = require('knex');

const {DATABASE_URL} = require('./config');

var knex = null;

function dbConnect(url = DATABASE_URL) {
  knex = createKnex({
    client: 'pg',
    connection: { user: 'dev',
        url}
  });
}

function dbDisconnect() {
  return knex.destroy();
}

function dbGet() {
  return knex;
}

module.exports = {
  dbConnect,
  dbDisconnect,
  dbGet
};