// Simple Express server for testing with Postman
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data - same as your frontend mock
let mockEmployees = [
  {
    emp_id: 1,
    first_name: "John",
    last_name: "Doe", 
    email: "john.doe@company.com",
    phone: "555-0123",
    address: "123 Main St, City, State",
    gender: "Male",
    dob: "1990-01-15",
    age: 35,
    id_number: "ID001",
    job_title: "Software Engineer",
    department: "Engineering",
    salary: 75000,
    employee_type: "Full-time"
  },
  {
    emp_id: 2,
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@company.com", 
    phone: "555-0124",
    address: "456 Oak Ave, City, State",
    gender: "Female",
    dob: "1988-06-22",
    age: 36,
    id_number: "ID002",
    job_title: "Product Manager",
    department: "Product",
    salary: 85000,
    employee_type: "Full-time"
  },
  {
    emp_id: 3,
    first_name: "Mike",
    last_name: "Johnson",
    email: "mike.johnson@company.com",
    phone: "555-0125", 
    address: "789 Pine Rd, City, State",
    gender: "Male",
    dob: "1995-03-10",
    age: 30,
    id_number: "ID003",
    job_title: "Designer",
    department: "Design",
    salary: 65000,
    employee_type: "Contract"
  }
];

let nextId = 4;

// Routes

// GET /employees - Get all employees
app.get('/employees', (req, res) => {
  console.log('GET /employees - Fetching all employees');
  res.json(mockEmployees);
});

// GET /employees/ - Alternative endpoint with trailing slash
app.get('/employees/', (req, res) => {
  console.log('GET /employees/ - Fetching all employees');
  res.json(mockEmployees);
});

// GET /employees/:id - Get employee by ID
app.get('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = mockEmployees.find(emp => emp.emp_id === id);
  
  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }
  
  console.log(`GET /employees/${id} - Found employee:`, employee.first_name, employee.last_name);
  res.json(employee);
});

// POST /employees - Add new employee
app.post('/employees', (req, res) => {
  console.log('POST /employees - Adding new employee:', req.body);
  
  const newEmployee = {
    ...req.body,
    emp_id: nextId++
  };
  
  mockEmployees.push(newEmployee);
  console.log('Employee added with ID:', newEmployee.emp_id);
  res.status(201).json(newEmployee);
});

// PUT /employees/:id - Update employee
app.put('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = mockEmployees.findIndex(emp => emp.emp_id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Employee not found' });
  }
  
  console.log(`PUT /employees/${id} - Updating employee:`, req.body);
  mockEmployees[index] = { ...req.body, emp_id: id };
  res.json(mockEmployees[index]);
});

// DELETE /employees/:id - Delete employee
app.delete('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = mockEmployees.findIndex(emp => emp.emp_id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Employee not found' });
  }
  
  console.log(`DELETE /employees/${id} - Deleting employee`);
  const deletedEmployee = mockEmployees.splice(index, 1)[0];
  res.json({ message: 'Employee deleted successfully', employee: deletedEmployee });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mock Employee API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock Employee API Server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET    /employees     - Get all employees`);
  console.log(`   GET    /employees/:id - Get employee by ID`);
  console.log(`   POST   /employees     - Add new employee`);
  console.log(`   PUT    /employees/:id - Update employee`);
  console.log(`   DELETE /employees/:id - Delete employee`);
  console.log(`   GET    /health        - Health check`);
  console.log(`\n💡 Test with Postman at http://localhost:8080`);
});

// Handle shutdown gracefully
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down mock server...');
  process.exit(0);
});
