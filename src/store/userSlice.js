import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currrentUser: null,
  },
  reducers: {
    setUser: (user, action) => {
      user.currentUser = action.payload;
    },
  },
});

export const { addNote, eraseNote, eraseBookNotes, setUser } =
  userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
