
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import UserMenu from '../Components/items/DropdownProfile'
import { deleteToken } from "../store/slices/auth";
import { CartInfoModal } from "../apps/customer/layout/CartInfoModal";
import { TypeUsers } from "../utils";

const MainNavigation = (props) => {
  const dispatch = useDispatch();
  const [openCart, setOpenCart] = useState(false)

  // Get user details from redux
  const { userType } = useSelector(state => state.auth);

  const logOutHandler = () => {
    localStorage.clear('TOKEN')
    dispatch(deleteToken())
  };

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">

            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={props.sidebarOpen}
              onClick={(e) => { e.stopPropagation(); props.setSidebarOpen(!props.sidebarOpen); }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {/* <Notifications align="right" /> */}
            {/* <Help align="right" /> */}
            {/* Order Info */}
            { 
              // user customer or guest, show the orders details on header
              TypeUsers.Customer.includes(userType) &&
              <CartInfoModal open={openCart} setOpen={setOpenCart} />
            }
            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 mx-3" />
            <UserMenu align="right" logInUrl={props.links.login} logOut={logOutHandler} />
          </div>
        </div>
      </div>
    </header>

  );
};

export default MainNavigation;