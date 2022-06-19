import types from "../types";

const initS = {
  logged: undefined
}

export const authReducer = (state=initS, action) => {

  switch(action.type) {
    case types.login: 
      return {
        logged: true,
        token: action.payload.token,
        user: action.payload.user
      }
    case types.logout: {
      localStorage.removeItem("proyecto_turismo-token");
      return {
        logged: false
      }
    }
    case types.register: {
      return state
    }
    default: 
      return {
        ...state
      };
  }
}