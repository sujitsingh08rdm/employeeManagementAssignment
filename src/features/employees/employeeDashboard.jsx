import React from "react";
import { Outlet } from "react-router-dom";

export default function EmployeeDashboard() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
