let { DataTypes , sequelize } = require('../lib/index');
let department = sequelize.define('department', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

module.exports = { department };