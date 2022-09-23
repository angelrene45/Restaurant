import { Link  } from 'react-router-dom';


const SidebarClie = () => {
  return (
    <div>
        <ul>
            <li>
                <Link to='/'>Table Map </Link>
            </li>
            <li>
                <Link to='/r_meats'> Red Meats </Link>
            </li>
            <li>
                <Link to='/w_meats'> White meats </Link>
            </li>
            <li>
                <Link to='/seafood'> Sea food </Link>
            </li>
            <li>
                <Link to='/drinks_wo'> Drinks without Alcohol </Link>
            </li>
            <li>
                <Link to='/drinks_w'> Alcoholic Drinks </Link>
            </li>
        </ul>
    </div>
  )
}

export default SidebarClie