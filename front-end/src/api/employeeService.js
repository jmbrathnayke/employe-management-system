// API Service for Employee Management
const API_BASE_URL = 'http://localhost:8080/employees';

export const employeeService = {
  // Get all employees
  getAllEmployees: async () => {
    try {
      const response = await fetch("http://localhost:8080/employees/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw new Error('Failed to fetch employees. Please check if the server is running.');
    }
  },

  // Add new employee
  addEmployee: async (employee) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding employee:', error);
      throw new Error('Failed to add employee. Please try again.');
    }
  },

  // Update existing employee
  updateEmployee: async (id, employee) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Employee not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating employee:', error);
      throw new Error('Failed to update employee. Please try again.');
    }
  },

  // Delete employee
  deleteEmployee: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Employee not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.text();
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw new Error('Failed to delete employee. Please try again.');
    }
  },

  // Get employee by ID (optional - for future use)
  getEmployeeById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Employee not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw new Error('Failed to fetch employee details.');
    }
  }
};