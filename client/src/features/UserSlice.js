import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("users/getUser", async (udata) => {
  try {
    const response = await axios.post("https://novacomputer-server.onrender.com/login", udata);
    return response.data;
  } catch (error) {
    throw new Error("Get User Failed");
  }
});

export const addUser = createAsyncThunk("users/addUser", async (udata) => {
  try {
    const response = await axios.post("https://novacomputer-server.onrender.com/register", udata);
    return response.data.message;
  } catch (error) {
    throw new Error("Add User Failed");
  }
});

const initVal = {
  user: {},
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorCount: 0,
  isLogedin: false,
  timerId: null,
  enableBtn: false,
};

export const UserSlice = createSlice({
  name: "users",
  initialState: initVal,
  reducers: {
    setTimer: (state, action) => {
      state.timerId ? clearTimeout(state.timerId) : null;
      state.timerId = action.payload;
      state.enableBtn = true;
    },

    clearTimer: (state) => {
      state.timerId ? clearTimeout(state.timerId) : null;
      state.timerId = null;
      state.enableBtn = false;
      state.errorCount = 0;
    },

    resetData: (state) => {
      state.isSuccess = false;
    },


  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state, action) => {
        state.isLoading = true;
        state.errorCount = state.message.includes("Get") ? 0 : state.errorCount;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        state.isLogedin = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
        state.errorCount = state.message.includes("Add") ? 0 : state.errorCount;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.isLogedin = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.errorCount += 1;
        state.isLoading = false;
        state.isError = true;
        state.message = `Login failed! Attempt ${state.errorCount} of 5`;
        if (state.errorCount >= 5) {
          state.enableBtn = true;
          state.message = "Too many attempts! Please wait 1 minute";
        }
      });
  },
});



export const { setTimer, clearTimer , resetData} = UserSlice.actions;
export default UserSlice.reducer;

