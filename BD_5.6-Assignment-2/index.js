let express = require('express');
let { sequelize } = require('./lib/index');
let { employee } = require('./models/employee.model');
let { role } = require('./models/role.model');
let { department } = require('./models/department.model');
let { employeeDepartment } = require('./models/employeeDepartment.model');
let { employeeRole } = require('./models/employeeRole.model');
let app = express();
app.use(express.json());
let port = 3000;


//Helper Functions//
// Helper function to get employee's associated departments
async function getEmployeeDepartments(employeeId) {
  const employeeDepartments = await employeeDepartment.findAll({
    where: { employeeId },
  });

  let departmentData;
  for (let empDep of employeeDepartments) {
    departmentData = await department.findOne({
      where: { id: empDep.departmentId },
    });
  }

  return departmentData;
}

//Helper Functions to get employee's associated roles
async function getEmployeeRole(roleId) {
  const employeeRoles = await employeeRole.findAll({
    where: { roleId },
  });

  let roleData;
  for(let empRole of employeeRole){
    roleData = await role.findOne({
      where: { id: empRole.roleId },
    });
  }

  return roleData;
};

// Helper function to get employee details with associated departments and roles
async function getEmployeeDetails(employeeData) {
  const department = await getEmployeeDepartments(employeeData.id);
  const role = await getEmployeeRoles(employeeData.id);

  return {
    ...employeeData.dataValues,
    department,
    role,
  };
};

//------------------------------------------------------------------------------------------------------------------------------------------//

// Endpoint to seed database
app.get('/seed_db', async (req, res) => {
  await sequelize.sync({ force: true });

  const departments = await department.bulkCreate([
    { name: 'Engineering' },
    { name: 'Marketing' },
  ]);

  const roles = await role.bulkCreate([
    { title: 'Software Engineer' },
    { title: 'Marketing Specialist' },
    { title: 'Product Manager' },
  ]);

  const employees = await employee.bulkCreate([
    { name: 'Rahul Sharma', email: 'rahul.sharma@example.com' },
    { name: 'Priya Singh', email: 'priya.singh@example.com' },
    { name: 'Ankit Verma', email: 'ankit.verma@example.com' },
  ]);

  // Associate employees with departments and roles using create method on junction models
  await employeeDepartment.create({
    employeeId: employees[0].id,
    departmentId: departments[0].id,
  });
  await employeeRole.create({
    employeeId: employees[0].id,
    roleId: roles[0].id,
  });

  await employeeDepartment.create({
    employeeId: employees[1].id,
    departmentId: departments[1].id,
  });
  await employeeRole.create({
    employeeId: employees[1].id,
    roleId: roles[1].id,
  });

  await employeeDepartment.create({
    employeeId: employees[2].id,
    departmentId: departments[0].id,
  });
  await employeeRole.create({
    employeeId: employees[2].id,
    roleId: roles[2].id,
  });

  return res.json({ message: 'Database seeded!' });
});

//----------------------------------------------------------------------------------------------------------------------------------------//

//server establishment//
app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
