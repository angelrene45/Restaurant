import Types from '../Types';

const initialState =  {
    dashBoard: '',
<<<<<<< HEAD
=======
    links: []
>>>>>>> FrontBeto
};

const DashBoardReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case Types.setDashBoard:
          return {
            ...state,
<<<<<<< HEAD
            dashBoard: action.payload,
=======
            dashBoard: action.payload.dashboard,
            links: action.payload.links,
>>>>>>> FrontBeto
          };
        default:
          return state

    };
};

export default DashBoardReducer;