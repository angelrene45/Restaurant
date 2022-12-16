import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);


export const displayMessage = (msg, icon="info", options={}) => {
    MySwal.fire({
        icon,
        title: '',
        text: msg,
        ...options
    })
}