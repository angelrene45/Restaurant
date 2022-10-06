import Types from '../Types';

const initialState =  {
    dashBoard: '',
};

const DashBoardReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case Types.setDashBoard:
          return {
            ...state,
            dashBoard: action.payload,
          };
        default:
          return state

    };
};

export default DashBoardReducer;