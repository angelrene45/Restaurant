import { Link  } from 'react-router-dom';

const SidebarAdm = (props) => {
  return (
    <div className='w-40 fixed sidebar  bg-gray-900 shadow-lg shadow-gray-500/90 h-full text-green-300 p-5'>
        <ul>
            {props.links.map(link => 
                <li key={link.name}>
                    <Link className='hover:text-green-50' to={link.url}>{link.name}</Link>
                </li>
            )}
        </ul>
    </div>
  )
}

export default SidebarAdm