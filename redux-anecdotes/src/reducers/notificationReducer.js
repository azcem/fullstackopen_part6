import { createSlice, current } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    addNotification(state, action) {
      return `you voted for ${action.payload}`;
    },
    removeNotification(state, action) {
      return "";
    },
  },
});

export const setNotification = (message, timeoutInterval) => {
  return async (dispatch) => {
    dispatch(addNotification(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, timeoutInterval * 1000);
  };
};

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
