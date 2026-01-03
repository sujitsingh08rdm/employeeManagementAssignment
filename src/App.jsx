import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import { useSelector } from "react-redux";

import LoginPage from "./features/auth/LoginPage";
import Sidebar from "./components/layout/sidebar";
import Navbar from "./components/layout/navbar";
import EmployeeDashboard from "./features/employees/EmployeeDashboard";
import DashboardSummary from "./pages/dashboardSummary";
import EmployeeList from "./features/employees/EmployeeList";
import EmployeeForm from "./features/employees/EmployeeForm";

const RequireAuth = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<RequireAuth />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<EmployeeDashboard />}>
              <Route index element={<DashboardSummary />} />
              <Route path="summary" element={<DashboardSummary />} />
              <Route path="employees" element={<EmployeeList />} />
              <Route path="employees/add" element={<EmployeeForm />} />
              <Route path="employees/edit/:id" element={<EmployeeForm />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
