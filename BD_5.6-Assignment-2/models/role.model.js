let { DataTypes, sequelize } = require('../lib/index');
let role = sequelize.define('role', {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = { role };
