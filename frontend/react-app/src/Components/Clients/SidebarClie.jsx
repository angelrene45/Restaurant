import { Link  } from 'react-router-dom';


const SidebarClie = () => {
  return (
    <div>
        <ul>
            <li>
                <Link to='/'>Mapa de mesas </Link>
            </li>
            <li>
                <Link to='/'> Bebidas </Link>
            </li>
            <li>
                Empleados
            </li>
            <li>
                Proveedores
            </li>
        </ul>
    </div>
  )
}

export default SidebarClie