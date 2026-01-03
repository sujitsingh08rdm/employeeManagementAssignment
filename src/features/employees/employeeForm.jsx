import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  createEmployee,
  getEmployee,
  clearSelected,
  editEmployee,
} from "./employeeSlice";

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedEmployee } = useSelector((state) => state.employee);

  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    state: "",
    status: "active",
    image: "",
  });

  const states = [
    "Maharashtra",
    "Delhi",
    "Karnataka",
    "West Bengal",
    "Uttar Pradesh",
    "Gujarat",
    "Andhra Pradesh",
    "Bihar",
    "Jharkhand",
    "Tamil Nadu",
    "Kerala",
    "Jammu & Kashmir",
  ];

  useEffect(() => {
    if (id) dispatch(getEmployee(id));
    else dispatch(clearSelected());
  }, [id, dispatch]);

  useEffect(() => {
    if (id && selectedEmployee) {
      setFormData(selectedEmployee);
      setPreview(selectedEmployee.image);
    }
  }, [selectedEmployee, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgURL = URL.createObjectURL(file);
    setPreview(imgURL);

    setFormData({ ...formData, image: imgURL });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) dispatch(editEmployee({ id, data: formData }));
    else dispatch(createEmployee(formData));

    dispatch(clearSelected());
    navigate("/dashboard/employees");
  };

  const handleCancel = () => {
    dispatch(clearSelected());
    navigate("/dashboard/employees");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow border">
      <h2 className="text-2xl font-semibold mb-5 text-[#5044e5]">
        {id ? "Edit Employee" : "Add Employee"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            className="border p-2 w-full rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            className="border p-2 w-full rounded"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* DOB */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            className="border p-2 w-full rounded"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select
            name="state"
            className="border p-2 w-full rounded"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Active/Inactive */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Status:</label>

          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="status"
              value="active"
              checked={formData.status === "active"}
              onChange={handleChange}
            />
            Active
          </label>

          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={formData.status === "inactive"}
              onChange={handleChange}
            />
            Inactive
          </label>
        </div>

        {/* Image Upload + Preview */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="border p-2 w-full rounded"
          />

          {preview && (
            <div className="mt-3 flex justify-center">
              <img
                src={preview}
                alt="preview"
                className="w-32 h-32 object-cover rounded border shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Submit/Cancel */}
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="bg-[#5044e5] text-white w-full py-2 rounded hover:opacity-90"
          >
            {id ? "Update Employee" : "Add Employee"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="border text-gray-700 w-full py-2 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
