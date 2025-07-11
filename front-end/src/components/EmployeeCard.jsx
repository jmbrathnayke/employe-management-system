import React, { use } from 'react';
import PropTypes from 'prop-types';
import {
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  Building,
  DollarSign,
  Users,
} from 'lucide-react';
import { useEffect,useState } from 'react';
import { employeeService } from '../api/employeeService';


const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  // Safety check: if employee prop is missing, don’t render
  if (!employee) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {employee.first_name} {employee.last_name}
            </h3>
            <p className="text-sm text-gray-600">{employee.job_title}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit?.(employee)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete?.(employee.emp_id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4" />
          <span>{employee.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4" />
          <span>{employee.phone_number}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Building className="w-4 h-4" />
          <span>{employee.department}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4" />
          <span>${employee.salary?.toLocaleString() || '0.00'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>{employee.emp_type}</span>
        </div>
      </div>
    </div>
  );
};

// Type-checking for props using PropTypes
EmployeeCard.propTypes = {
  employee: PropTypes.shape({
    emp_id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    job_title: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
    department: PropTypes.string,
    salary: PropTypes.number,
    emp_type: PropTypes.string,
  }),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default EmployeeCard;
