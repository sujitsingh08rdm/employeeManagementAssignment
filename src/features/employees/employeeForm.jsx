import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";

import {
  createEmployee,
  getEmployee,
  clearSelected,
  editEmployee,
} from "./employeeSlice";
import Button from "../../components/ui/Button";

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
  const [formErrors, setFormErrors] = useState({});

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

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
      setPreview(reader.result);
    };

    // const imgURL = URL.createObjectURL(file);
    // setPreview(imgURL);

    // setFormData({ ...formData, image: imgURL });
  };

  // Form Validation function
  const validate = () => {
    const errors = {};

    // Full Name
    if (!formData.name.trim()) {
      errors.name = "Full Name is required";
    } else if (formData.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    // Gender
    if (!formData.gender) {
      errors.gender = "Gender is required";
    }

    // DOB
    if (!formData.dob) {
      errors.dob = "Date of Birth is required";
    } else {
      const age =
        new Date().getFullYear() - new Date(formData.dob).getFullYear();
      if (age < 18) {
        errors.dob = "Employee must be at least 18 years old";
      } else if (age > 100) {
        errors.dob = "Employee must be less then 100 years old";
      }
    }

    // State
    if (!formData.state) {
      errors.state = "State is required";
    }

    // Status
    if (!formData.status) {
      errors.status = "Status is required";
    }

    // Image (optional, but can enforce)
    if (!formData.image) {
      errors.image = "Profile image is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (id) dispatch(editEmployee({ id, data: formData }));
      else dispatch(createEmployee(formData));

      dispatch(clearSelected());
      navigate("/dashboard/employees");
    } else {
      console.log("Form Validation failed");
    }
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
          {formErrors.name && (
            <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>
          )}
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
          {formErrors.gender && (
            <p className="text-red-400 text-sm mt-1">{formErrors.gender}</p>
          )}
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
          {formErrors.dob && (
            <p className="text-red-400 text-sm mt-1">{formErrors.dob}</p>
          )}
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
          {formErrors.state && (
            <p className="text-red-400 text-sm mt-1">{formErrors.state}</p>
          )}
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
          {formErrors.status && (
            <p className="text-red-400 text-sm mt-1">{formErrors.status}</p>
          )}
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
          {formErrors.image && (
            <p className="text-red-400 text-sm mt-1">{formErrors.image}</p>
          )}
        </div>

        {/* Submit/Cancel */}
        <div className="flex gap-3 mt-4">
          <Button type="submit">
            {id ? "Update Employee" : "Add Employee"}
          </Button>

          <Button
            type="button"
            onClick={handleCancel}
            color="border"
            textColor="text-gray-700"
            border={true}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
