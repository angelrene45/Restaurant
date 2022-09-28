import Types from '../Types';

const initialState =  {
    authToken: '',
    authorization: false,
    user:''
};

const LoginReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case Types.setToken:
          return {
            ...state,
            authToken: action.payload,
            authorization: true,
          };
        default:
          return state

    };
};

export default LoginReducer;