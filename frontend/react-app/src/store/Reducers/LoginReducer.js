import Types from '../Types';

const initialState =  {
    authToken: '',
    authorization: false,
<<<<<<< HEAD
    role:''
=======
<<<<<<< HEAD
    user:''
=======
    role:''
>>>>>>> refs/remotes/origin/FrontBeto
>>>>>>> FrontBeto
};

const LoginReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case Types.setToken:
          return {
            ...state,
<<<<<<< HEAD
=======
<<<<<<< HEAD
            authToken: action.payload,
            authorization: true,
          };
=======
>>>>>>> FrontBeto
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
<<<<<<< HEAD
=======
>>>>>>> refs/remotes/origin/FrontBeto
>>>>>>> FrontBeto
        default:
          return state

    };
};

export default LoginReducer;