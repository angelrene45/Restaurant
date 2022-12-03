import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);

export const displayMessage = (msg, icon="info") => {
    MySwal.fire({
        icon: icon,
        title: '',
        text: msg,
        showConfirmButton: true,
    })
}