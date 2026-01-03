import axiosInstance from "./axiosInstace";

// Fetch user by email (mock login)
export const getUserByEmail = async (email) => {
  const res = await axiosInstance.get(`/users?email=${email}`);
  return res.data;
};

// Save user session after login success
export const setUserSession = (user) => {
  localStorage.setItem("loggedUser", JSON.stringify(user));
  return true;
};
