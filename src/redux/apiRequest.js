import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logOut } from "./authSlice";
import { getUserFail, getUserStart, getUserSuccess } from "./userSlice";
import { getPostStart, getPostSuccess, getPostFail } from "./postSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/loginAdmin", user);
    dispatch(loginSuccess(res.data));
    navigate("/home");
  } catch (error) {
    dispatch(loginFailed());
    console.log(error.message);
  }
};

export const getAllUser = async (dispatch) => {
  dispatch(getUserStart());
  try {
    // console.log(accessToken);
    const res = await axios.get("/user");
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFail());
  }
};
export const logOutUser = (dispatch) => {
  try {
    dispatch(logOut());
  } catch (error) {
    dispatch(getUserFail());
  }
};

export const getPostUser = async (username, dispatch) => {
  dispatch(getPostStart());
  try {
    const res = await axios.get("/post/profile/" + username);
    dispatch(getPostSuccess(res.data));
  } catch (error) {
    dispatch(getPostFail());
  }
};

export const getAllPost = async (dispatch) => {
  dispatch(getPostStart());
  try {
    const res = await axios.get("/post");
    dispatch(getPostSuccess(res.data));
  } catch (error) {
    dispatch(getPostFail());
  }
};
