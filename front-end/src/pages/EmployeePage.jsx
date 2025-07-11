import React, { useState } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import EmployeeForm from '../components/EmployeeForm';

const EmployeePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    emp_id: 1,
    first_name: "John",
    last_name: "Doe",
    job_title: "Software Engineer",
    email: "john.doe@example.com",
    phone_number: "123-456-7890",
    department: "Engineering",
    salary: 75000,
    emp_type: "Full-Time"
  });

  const handleEdit = (employee) => {
    console.log("Edit employee", employee);
    setShowForm(true);
  };

  const handleDelete = (emp_id) => {
    console.log("Delete employee with ID:", emp_id);
    // Optional: add logic to delete
  };

  const handleSave = (formData) => {
    console.log('Saved Employee Data:', formData);
    setEmployeeData(formData);
    setShowForm(false);
  };

  const handleCancel = () => {
    console.log('Form canceled');
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Employee Page</h1>

      {!showForm && (
        <>
          <EmployeeCard
            employee={employeeData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Employee
          </button>
        </>
      )}

      {showForm && (
        <EmployeeForm
          employee={employeeData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default EmployeePage;
