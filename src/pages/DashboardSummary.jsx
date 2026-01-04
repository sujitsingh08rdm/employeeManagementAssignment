import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../features/employees/employeeSlice";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

export default function DashboardSummary() {
  const { list, loading } = useSelector((store) => store.employee);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const totalEmployees = list.length;
  console.log(list);
  const genderCount = list.reduce(
    (acc, emp) => {
      const gender = emp.gender.toLowerCase();
      if (gender === "male") {
        acc.male++;
      } else if (gender === "female") {
        acc.female++;
      } else {
        acc.other++;
      }
      return acc;
    },
    {
      male: 0,
      female: 0,
      other: 0,
    }
  );

  const statusCount = list.reduce(
    (acc, emp) => {
      const status = emp.status?.toLowerCase();
      if (status === "active") {
        acc.active++;
      } else {
        acc.inactive++;
      }
      return acc;
    },
    { active: 0, inactive: 0 }
  );

  const genderData = [
    {
      name: "Male",
      value: genderCount.male,
    },
    {
      name: "Female",
      value: genderCount.female,
    },
    {
      name: "Other",
      value: genderCount.other,
    },
  ];

  const statusData = [
    { name: "Active", value: statusCount.active },
    {
      name: "Inactive",
      value: statusCount.inactive,
    },
  ];

  console.log(statusData);

  if (loading) {
    return (
      <div>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-5">
      <h2 className="text-2xl font-semibold text-[#5044e5]">
        Dashboard Summary
      </h2>

      {/* Summary Box */}
      <div className="bg-white shadow rounded p-4 w-64 border-l-4 border-[#5044e5]">
        <p className="text-lg font-medium">Total Employees</p>
        <p className="text-3xl font-bold text-[#5044e5]">{totalEmployees}</p>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gender Chart */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-xl font-semibold mb-3 text-[#5044e5]">
            Employees by Gender
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {genderData.map((_, i) => {
                  const genderColors = ["#5044e5", "#22c55e", "#959595"];

                  return <Cell key={i} fill={genderColors[i]} />;
                })}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Active/Inactive Chart */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-xl font-semibold mb-3 text-[#5044e5]">
            Active vs Inactive Employees
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {statusData.map((_, i) => {
                  const statusColors = ["#22c55e", "#959595"];
                  return <Cell key={i} fill={statusColors[i]} />;
                })}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
