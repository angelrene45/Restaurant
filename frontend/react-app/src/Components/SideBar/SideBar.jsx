import { Link  } from 'react-router-dom';

<<<<<<< HEAD
const Sidebar = (props) => {
  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
=======
<<<<<<< HEAD

=======
>>>>>>> refs/remotes/origin/FrontBeto
const SidebarAdm = (props) => {
  return (
    <div className='w-40 fixed sidebar  bg-gray-900 shadow-lg shadow-gray-500/90 h-full text-green-300 p-5'>
>>>>>>> FrontBeto
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

<<<<<<< HEAD
export default Sidebar
=======
export default SidebarAdm
>>>>>>> FrontBeto
