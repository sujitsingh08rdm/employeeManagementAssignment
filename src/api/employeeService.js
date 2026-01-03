import axiosInstance from "./axiosInstace";

// Get all employees
export const fetchEmployees = async () => {
  const response = await axiosInstance.get("/employees");
  return response.data;
};

// Get single employee by ID
export const fetchEmployeeById = async (id) => {
  const response = await axiosInstance.get(`/employees/${id}`);
  return response.data;
};

// Add new employee
export const addEmployee = async (employeeData) => {
  const response = await axiosInstance.post("/employees", employeeData);
  return response.data;
};

// Update employee
export const updateEmployee = async (id, employeeData) => {
  const response = await axiosInstance.put(`/employees/${id}`, employeeData);
  return response.data;
};

// Delete employee
export const deleteEmployee = async (id) => {
  const response = await axiosInstance.delete(`/employees/${id}`);
  return response.data;
};
