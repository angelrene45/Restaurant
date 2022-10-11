import Types from '../Types';

const initialState =  {
    authToken: '',
    authorization: false,
    role:''
};

const LoginReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case Types.setToken:
          return {
            ...state,
            authToken: action.payload.token,
            role: action.payload.role,
            authorization: true,
          };
        case Types.deleteToken:
          return {
            ...state,
            authToken: '',
            role: '',
            authorization: false,
          };
        default:
          return state

    };
};

export default LoginReducer;