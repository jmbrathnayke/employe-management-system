// API Base URL
export const API_BASE_URL = 'http://localhost:5173';

// API Endpoints
export const EMPLOYEE_API = {
  GET_ALL: `${API_BASE_URL}/employees`,
  ADD: `${API_BASE_URL}/employees`,
  UPDATE: (id) => `${API_BASE_URL}/employees/${id}`,
  DELETE: (id) => `${API_BASE_URL}/employees/${id}`,
};

// Employee Types
export const EMPLOYEE_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Intern',
];

// Gender Options
export const GENDER_OPTIONS = [
  'Male',
  'Female',
  'Other',
];

// Form Validation Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
};

// Field Labels (Optional)
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
