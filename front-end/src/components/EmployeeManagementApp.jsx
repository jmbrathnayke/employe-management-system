import React, { useState, useEffect } from 'react';
import { Plus, Users } from 'lucide-react';
import EmployeeForm from './EmployeeForm';
import EmployeeCard from './EmployeeCard';
import { employeeService } from '../api/employeeService';
// import { mockEmployeeService as employeeService } from '../api/mockEmployeeService';
// constants/constants.js
export const EMPLOYEE_API = {
  GET_ALL: '/api/employees',
  ADD: '/api/employees',
  UPDATE: (id) => `/api/employees/${id}`,
  DELETE: (id) => `/api/employees/${id}`,
};

export const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

export const EMPLOYEE_TYPES = ['Full-time', 'Part-time', 'Contract', 'Intern'];

export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
};

export const FIELD_LABELS = {
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
  EMAIL: 'Email',
  PHONE: 'Phone Number',
  ADDRESS: 'Address',
  GENDER: 'Gender',
  DOB: 'Date of Birth',
  AGE: 'Age',
  ID: 'ID Number',
  JOB_TITLE: 'Job Title',
  DEPARTMENT: 'Department',
  SALARY: 'Salary',
  EMP_TYPE: 'Employee Type',
};


//Main component for managing employeesHandles CRUD operations and search/filtering logic.
const EmployeeManagementApp = () => {
  // App state management
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch employees on initial render
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees whenever the list or search query changes
  useEffect(() => {
    filterEmployees();
  }, [searchQuery, employees]);

 // Fetch all employees from the API
  const fetchEmployees = async () => {
    setIsLoading(true);
    setError(null);
    try {
      

      const data = await employeeService.getAllEmployees();
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  // Filter employee list based on search input
  const filterEmployees = () => {
    if (!searchQuery) {
      setFilteredEmployees(employees);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();

    const filtered = employees.filter((emp) => {
      return (
        (emp.first_name && emp.first_name.toLowerCase().includes(lowerQuery)) ||
        (emp.last_name && emp.last_name.toLowerCase().includes(lowerQuery)) ||
        (emp.job_title && emp.job_title.toLowerCase().includes(lowerQuery)) ||
        (emp.department && emp.department.toLowerCase().includes(lowerQuery))
      );
    });

    setFilteredEmployees(filtered);
  };
 // Add a new employee
  const handleAddEmployee = async (employeeData) => {
    try {
      await employeeService.addEmployee(employeeData);
      await fetchEmployees();
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };
// Update an existing employee
  const handleUpdateEmployee = async (employeeData) => {
    try {
      await employeeService.updateEmployee(editingEmployee.emp_id, employeeData);
      await fetchEmployees();
      setShowForm(false);
      setEditingEmployee(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete an employee with confirmation
  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeService.deleteEmployee(id);
        await fetchEmployees();
      } catch (err) {
        setError(err.message);
      }
    }
  };
 // Handle clicking the "Edit" button on a card
  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  // Handle form cancel (close form and reset state)
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Employee Management System</h1>
          <p className="text-gray-600">Manage your team members efficiently</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Search Input and Add Button */}
        <div className="mb-6 flex justify-between items-center space-x-4">
          <input
            type="text"
            placeholder="Search by name, job title, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Employee</span>
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading employees...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <EmployeeCard
                  key={employee.emp_id}
                  employee={employee}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteEmployee}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">No employees match your search.</p>
            )}
          </div>
        )}

        {filteredEmployees.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No employees found</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first employee</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Employee
            </button>
          </div>
        )}

        {showForm && (
          <EmployeeForm
            employee={editingEmployee}
            onSave={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
            onCancel={handleFormCancel}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeManagementApp;
