// Mock Employee Service for Testing
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

// Mock delay to simulate network requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockEmployeeService = {
  // Get all employees
  getAllEmployees: async () => {
    await delay(500); // Simulate network delay
    return [...mockEmployees];
  },

  // Add new employee
  addEmployee: async (employee) => {
    await delay(300);
    const newEmployee = {
      ...employee,
      emp_id: nextId++
    };
    mockEmployees.push(newEmployee);
    return newEmployee;
  },

  // Update existing employee
  updateEmployee: async (id, employee) => {
    await delay(300);
    const index = mockEmployees.findIndex(emp => emp.emp_id === id);
    if (index === -1) {
      throw new Error('Employee not found');
    }
    mockEmployees[index] = { ...employee, emp_id: id };
    return mockEmployees[index];
  },

  // Delete employee
  deleteEmployee: async (id) => {
    await delay(300);
    const index = mockEmployees.findIndex(emp => emp.emp_id === id);
    if (index === -1) {
      throw new Error('Employee not found');
    }
    const deletedEmployee = mockEmployees.splice(index, 1)[0];
    return deletedEmployee;
  }
};
