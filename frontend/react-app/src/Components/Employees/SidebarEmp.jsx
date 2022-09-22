import { Link  } from 'react-router-dom';


const SidebarEmp = () => {
  return (
    <div>
        <ul>
            <li>
                <Link to=''>Inicio </Link>
            </li>
            <li>
                Ventas
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

export default SidebarEmp