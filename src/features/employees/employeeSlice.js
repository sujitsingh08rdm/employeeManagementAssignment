import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addEmployee,
  fetchEmployeeById,
  fetchEmployees,
} from "../../api/employeeService";

export const getEmployees = createAsyncThunk(
  "employees/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchEmployees();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getEmployee = createAsyncThunk(
  "employees/getById",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchEmployeeById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (data, { rejectWithValue }) => {
    try {
      return await addEmployee(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    list: [],
    selectedEmployee: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelected: (state) => {
      state.selectedEmployee = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.selectedEmployee = action.payload;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export const { clearSelected } = employeeSlice.actions;
export default employeeSlice.reducer;
