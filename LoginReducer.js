import { combineReducers } from 'redux';

const INITIAL_STATE = {
  login: "",
  password: ""
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
        return {
                 login: action.payload.login,
                 password: action.payload.password
               };
    default:
      return state
  }
};

export default combineReducers({
  login: loginReducer
});
