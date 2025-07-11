// components/EmployeeForm.js
import React, { useState, useEffect } from 'react';
import {
  GENDER_OPTIONS,
  EMPLOYEE_TYPES,
  FIELD_LABELS,
  ERROR_MESSAGES
} from '../utils/constants';

const EmployeeForm = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: '',
    gender: '',
    date_of_birth: '',
    age: '',
    id: '',
    job_title: '',
    department: '',
    salary: '',
    emp_type: ''
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        ...employee,
        date_of_birth: employee.date_of_birth ? new Date(employee.date_of_birth).toISOString().split('T')[0] : '',
        salary: employee.salary || '',
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const submitData = {
      ...formData,
      age: parseInt(formData.age) || 0,
      salary: parseFloat(formData.salary) || 0.0,
      date_of_birth: formData.date_of_birth ? new Date(formData.date_of_birth).toISOString() : null
    };
    onSave(submitData);
  };

  const renderInput = (label, name, type = 'text', required = false) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name] ?? ''}
        onChange={handleChange}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {employee ? 'Edit Employee' : 'Add New Employee'}
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput(FIELD_LABELS.FIRST_NAME, 'first_name', 'text', true)}
            {renderInput(FIELD_LABELS.LAST_NAME, 'last_name', 'text', true)}
            {renderInput(FIELD_LABELS.EMAIL, 'email', 'email', true)}
            {renderInput(FIELD_LABELS.PHONE, 'phone_number')}
            {renderInput(FIELD_LABELS.ADDRESS, 'address')}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{FIELD_LABELS.GENDER}</label>
              <select
                name="gender"
                value={formData.gender ?? ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                {GENDER_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {renderInput(FIELD_LABELS.DOB, 'date_of_birth', 'date')}
            {renderInput(FIELD_LABELS.AGE, 'age', 'number')}
            {renderInput(FIELD_LABELS.ID, 'id')}
            {renderInput(FIELD_LABELS.JOB_TITLE, 'job_title')}
            {renderInput(FIELD_LABELS.DEPARTMENT, 'department')}
            {renderInput(FIELD_LABELS.SALARY, 'salary', 'number')}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{FIELD_LABELS.EMP_TYPE}</label>
              <select
                name="emp_type"
                value={formData.emp_type ?? ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                {EMPLOYEE_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {employee ? 'Update' : 'Add'} Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
