import { createSlice } from "@reduxjs/toolkit";
import appAPI from "@/services/appAPI";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    // (optional) your own actions, e.g. add reset notifications...
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        appAPI.endpoints.register.matchFulfilled,
        (state, { payload }) => payload
      )
      .addMatcher(
        appAPI.endpoints.login.matchFulfilled,
        (state, { payload }) => payload
      )
      .addMatcher(appAPI.endpoints.logout.matchFulfilled, () => null);
  },
});

export default userSlice.reducer;
