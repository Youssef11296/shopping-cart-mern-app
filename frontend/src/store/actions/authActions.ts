// action types
import * as actionTypes from "./actionTypes";
// api
import * as api from "../../api";
// modules
import { toast } from "react-toastify";

// register user
const registerUser =
  ({ username, email, password }: User) =>
  async (dispatch: any) => {
    try {
      const { data } = await api.AUTH_API.registerUser({
        username,
        email,
        password,
      });
      dispatch({
        type: actionTypes.REGISTER_USER,
      });
      if (data.success) {
        dispatch({
          type: actionTypes.REGISTER_SUCCESS,
          payload: {
            user: data.data,
            message: data.message,
          },
        });
      }
    } catch (error) {
      toast("ERROR");
    }
  };

export { registerUser };
