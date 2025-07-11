import React, { useState } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import EmployeeForm from '../components/EmployeeForm';
import { useEffect } from 'react';

const EmployeePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  
      useEffect(() => {
          const fetchData = async()=>{
              try {
                  const response = await fetch("http://localhost:8080/employees/");
                  const data = await response.json();
                  setEmployeeData(data);
              } catch (error) {
                  console.log(error.message)
              }
          }
          fetchData();
      },[])
  
      console.log(employeeData)

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
          {employeeData.map((employee,index)=>(
            <div key={employee.emp_id} className="mb-4">
              <EmployeeCard
                key={index}
                employee={employee}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              
            </div>
          ))}
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
