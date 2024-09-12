let { DataTypes, sequelize } = require('../lib/index');
let employee = sequelize.define('employee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = { employee };
