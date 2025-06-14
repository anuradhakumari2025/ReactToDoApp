import axios from "../../api/axiosconfig";
import { loadUser, removeUser } from "../reducers/userSlice";

export const asyncLoginUser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `users?email=${user.email}&password=${user.password}`
    );
    // console.log(data[0])
    localStorage.setItem("user", JSON.stringify(data[0]));
  } catch (error) {
    console.log(error);
  }
};

export const asyncLogoutUser = (user) => async (dispatch, getState) => {
  try {
    localStorage.removeItem("user");
    dispatch(removeUser(user));
    console.log("logout!!");
  } catch (error) {
    console.log(error);
  }
};

export const asyncCurrentUser = () => async (dispatch, getState) => {
  try {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch(loadUser(user));
    else console.log("Login to Access is denied");
  } catch (error) {
    console.log(error);
  }
};

export const asyncRegisterUser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/users", user);
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const asyncUpdateProfile = (id, user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.patch("/users/" + id, user);
    // console.log(data);
    localStorage.setItem('user',JSON.stringify(data))
    dispatch(asyncCurrentUser())
  } catch (error) {
    console.log(error);
  }
};

 export const asyncDeleteUser =
  (id) => async (dispatch, getState) => {
    try {
      await axios.delete("/users/" + id);
      dispatch(asyncLogoutUser())
      console.log("User Account Deleted Successfully!!")
    } catch (error) {
      console.log(error);
    }
  };
