import { Link  } from 'react-router-dom';

const SidebarAdm = (props) => {
  return (
    <div>
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