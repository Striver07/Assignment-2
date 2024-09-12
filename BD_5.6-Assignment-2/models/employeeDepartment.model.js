let { DataTypes, sequelize } = require('../lib/index');
let { employee } = require('./employee.model');
let { department } = require('./department.model');
let employeeDepartment = sequelize.define('employeeDepartment', {
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: employee,
      key: 'id',
    },
  },
  departmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: department,
      key: 'id',
    },
  },
});

//creating associations between models//
employee.belongsTo(department, { through: employeeDepartment });
department.belongsToMany(employee, { through: employeeDepartment });

//exporting the model//
module.exports = { employeeDepartment };
