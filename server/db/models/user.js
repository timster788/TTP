const Sequelize = require('sequelize');
const bycrypt = require('bycrptjs');
const db = require('../db');

const User = db.define('user', {
  id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true},
  email: {type: Sequelize.STRING, unique: true, allowNull: false},

  name: {
    type: Sequelize.STRING,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return () => this.getDataValue('password');
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt');
    }
  },
  cashBal: {type: Sequelize.DOUBLE, allowNull: false, defaultValue: 5000.00}
});


User.prototype.validatePassword = function(pwd) {
    const currentUser =this;
  return bycrypt.compare(pwd,currentUser.password)
};

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  return crypto.createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex');
};

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;