import Types from '../Types';

const initialState =  {
    dashBoard: '',
    links: []
};

const DashBoardReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case Types.setDashBoard:
          return {
            ...state,
            dashBoard: action.payload.dashboard,
            links: action.payload.links,
          };
        default:
          return state

    };
};

export default DashBoardReducer;