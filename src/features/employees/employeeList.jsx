import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees, removeEmployee } from "./employeeSlice";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { list, loading } = useSelector((store) => store.employee);

  const filteredEmployees = list.filter((emp) => {
    const matchesName = emp.name.toLowerCase().includes(search.toLowerCase());
    const matchesGender =
      genderFilter === "all" || emp.gender.toLowerCase() === genderFilter;
    const matchesStatus =
      statusFilter === "all" || emp.status.toLowerCase() === statusFilter;
    return matchesName && matchesGender && matchesStatus;
  });

  const handleEdit = (id) => {
    navigate(`/dashboard/employees/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(removeEmployee(id));
    }
  };

  const handlePrint = () => {
    const content = document.getElementById("printSection").innerHTML;
    const original = document.body.innerHTML;

    document.body.innerHTML = content;
    window.print();
    document.body.innerHTML = original;
    window.location.reload(); // restores events & UI
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  if (loading) {
    return (
      <div>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Employee List</h2>

      <div className="flex gap-4">
        <div>
          <button
            onClick={() => navigate("/dashboard/employees/add")}
            className="bg-[#5044e5] text-white px-4 py-2 rounded mb-4"
          >
            + Add Employee
          </button>
        </div>
        <div>
          <button
            onClick={handlePrint}
            className="bg-[#5044e5] text-white px-4 py-2 rounded ml-3"
          >
            Print Employee List
          </button>
        </div>
        <div className="flex gap-3 mb-4">
          {/* Search by Name */}
          <input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-60"
          />

          {/* Gender Filter */}
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="all">All Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Active/Inactive Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div
        id="printSection"
        className="overflow-x-auto bg-white rounded shadow"
      >
        <table className="w-full text-left border-collapse">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Full Name</th>
              <th className="p-3">Gender</th>
              <th className="p-3">DOB</th>
              <th className="p-3">State</th>
              <th className="p-3">Status</th>
              <th className="p-3">Profile</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{emp.id}</td>
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.gender}</td>
                  <td className="p-3">{emp.dob}</td>
                  <td className="p-3">{emp.state}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        emp.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {emp.image ? (
                      <img
                        src={emp.image}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded-full" />
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleEdit(emp.id)}
                      className="text-blue-600 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
