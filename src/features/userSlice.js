// import { createSlice } from "@reduxjs/toolkit";
// import appAPI from "@/services/appAPI";

// const userSlice = createSlice({
//   name: "user",
//   initialState: null,
//   reducers: {
//     addNotifications: (state, { payload }) => {
//       console.log(payload)
//       if (state.newMessages[payload]) {
//         state.newMessages[payload] = state.newMessages[payload] + 1;
//       } else {
//         state.newMessages[payload] = 1;
//       }
//     },
//     resetNotifications: (state, { payload }) => {
//       delete state.newMessages[payload];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addMatcher(
//         appAPI.endpoints.register.matchFulfilled,
//         (state, { payload }) => payload
//       )
//       .addMatcher(
//         appAPI.endpoints.login.matchFulfilled,
//         (state, { payload }) => payload
//       )
//       .addMatcher(appAPI.endpoints.logout.matchFulfilled, () => null);
//   },
// });
// export const { addNotifications, resetNotifications } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import appAPI from "@/services/appAPI";

const initialState = {
  user: null,
  newMessages: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addNotifications: (state, { payload }) => {
      if (state.newMessages[payload]) {
        state.newMessages[payload] += 1;
      } else {
        state.newMessages[payload] = 1;
      }
    },
    resetNotifications: (state, { payload }) => {
      if (state.newMessages) {
        delete state.newMessages[payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(appAPI.endpoints.register.matchFulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addMatcher(appAPI.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addMatcher(appAPI.endpoints.logout.matchFulfilled, () => initialState);
  },
});

export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;
