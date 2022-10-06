<<<<<<< HEAD

const MainNavigation = () => {

  return (
    <header >
      
    </header>
=======
import { Link  } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";


import Types from '../store/Types';


const MainNavigation = () => {
  const dispatch = useDispatch();
  const tittle = useSelector(state => state.DashBoardReducer.dashBoard)
  const logOutHandler = () => {
    localStorage.clear('TOKEN')
    localStorage.clear('ROLE')
    dispatch({ type: Types.deleteToken })
  };

  return (
    <div className='fixed md:static bg-sky-900 navbar w-full text-green-400 p-5 m-0 flex flex-row grid grid-cols-6 gap-4'>
      <div className="col-start-0">
        <h1>{tittle}</h1>
      </div>
      <div className="col-end-7">
        <h1 className='hover:text-green-50' style={{ cursor: "pointer"}} onClick={logOutHandler}>{'LogOut'}</h1>
      </div>
    </div>
>>>>>>> refs/remotes/origin/FrontBeto
  );
};

export default MainNavigation;