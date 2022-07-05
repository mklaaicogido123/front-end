import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logOut } from "./authSlice";
import { getUserFail, getUserStart, getUserSuccess } from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/loginAdmin", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(loginFailed());
    console.log(error.message);
  }
};

export const getAllUser = async (accessToken, dispatch) => {
  dispatch(getUserStart());
  try {
    console.log(accessToken);
    const res = await axios.get("/user", {
      headers: {
        token: accessToken,
      },
    });
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
