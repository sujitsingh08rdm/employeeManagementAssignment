import { ChartGantt, Clipboard, UserPlus } from "lucide-react";
import { NavLink } from "react-router";

const Sidebar = () => {
  const menu = [
    {
      path: "/dashboard/summary",
      label: "Dashboard Summary",
      icon: <ChartGantt />,
    },
    {
      path: "/dashboard/employees",
      label: "Employee List",
      icon: <Clipboard />,
    },
    {
      path: "/dashboard/employees/add",
      label: "Add Employee",
      icon: <UserPlus />,
    },
  ];

  return (
    <aside className="w-sm bg-[#5044e5] text-white h-screen flex flex-col py-5 px-3">
      <div className="text-xl hidden sm:block font-bold text-center mb-8">
        EMS Panel
      </div>

      <div className="flex flex-row sm:flex-col gap-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition ${
                isActive ? "bg-white text-[#5044e5]" : "hover:bg-[#6a5df0]"
              }`
            }
            end
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
