import Types from '../Types';

const initialState =  {
    authToken: '',
    authorization: false,
<<<<<<< HEAD
    user:''
=======
    role:''
>>>>>>> refs/remotes/origin/FrontBeto
};

const LoginReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case Types.setToken:
          return {
            ...state,
<<<<<<< HEAD
            authToken: action.payload,
            authorization: true,
          };
=======
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
>>>>>>> refs/remotes/origin/FrontBeto
        default:
          return state

    };
};

export default LoginReducer;