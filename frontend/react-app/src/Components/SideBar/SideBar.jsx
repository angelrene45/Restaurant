import { Link  } from 'react-router-dom';

const Sidebar = (props) => {
  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
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

export default Sidebar