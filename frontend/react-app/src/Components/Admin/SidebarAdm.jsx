import { Link  } from 'react-router-dom';


const SidebarAdm = () => {
  return (
    <div>
        <ul>
            <li>
                <Link className='hover:text-green-50' to='/'>Home </Link>
            </li>
            <li>
                <Link className='hover:text-green-50' to='/sales'>Sales</Link>
            </li>
            <li>
                <Link className='hover:text-green-50' to='/employees'> Employees </Link>
            </li>
            <li>
                <Link className='hover:text-green-50' to='/providers'> Providers </Link>
            </li>
            <li>
                <Link className='hover:text-green-50' to='/reports'> Reports </Link>
            </li>
            <li>
                <Link className='hover:text-green-50' to='/menu_reg'> Menu register </Link>
            </li>
        </ul>
    </div>
  )
}

export default SidebarAdm