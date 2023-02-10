import * as actionTypes from "../actions/actionTypes";
import * as api from "../../api";

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
  }
};
