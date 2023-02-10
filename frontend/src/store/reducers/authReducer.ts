import * as actionTypes from "../actions/actionTypes";
import * as api from "../../api";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  token: localStorage.getItem("token") ?? null,
  loading: false,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.REGISTER_SUCCESS:
      toast(action?.payload?.message);

      return {
        ...state,
        loading: false,
        user: action?.payload?.user,
      };

    case actionTypes.REGISTER_FAIL:
      toast("Register failed!");

      return {
        ...state,
        loading: false,
        user: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
