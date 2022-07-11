import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: {
      allPost: null,
      isFteching: false,
      error: false,
    },
  },
  reducers: {
    getPostStart: (state) => {
      state.posts.isFteching = true;
    },
    getPostSuccess: (state, action) => {
      state.posts.isFteching = false;
      state.posts.allPost = action.payload;
    },
    getPostFail: (state) => {
      state.posts.isFteching = false;
      state.posts.error = true;
    },
  },
});

export const { getPostStart, getPostSuccess, getPostFail } = postSlice.actions;

export default postSlice.reducer;
