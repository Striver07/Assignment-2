let { DataTypes, sequelize } = require('../lib/index');
let { employee } = require('./employee.model');
let { role } = require('./role.model');
let employeeRole = sequelize.define('employeeRole', {
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: employee,
      key: 'id',
    },
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: role,
      key: 'id',
    },
  },
});

//creating associations between models//
employee.belongsTo(role, { through: employeeRole });
role.belongsToMany(employee, { through: employeeRole });

//exporting the model//
module.exports = { employeeRole };
