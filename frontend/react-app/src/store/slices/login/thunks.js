import { backendApi } from "../../../api";
import { setToken } from "./loginSlice"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);


export const getToken = (username, password) => {

    return async (dispatch, getState) => {

        const params = new URLSearchParams();
        params.append("username", username);
        params.append("password", password);

        const config = {
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded', 
              'Accept': 'application/json'
            }
        };

        // execute call api 
        try {
            const {data, status, statusText} = await backendApi.post(`/login/access-token`, params, config);
            localStorage.setItem('TOKEN', data.access_token);
            localStorage.setItem('ROLE', data.user_data.role);
            dispatch(setToken({token: data.access_token, role: data.user_data.role }));

        } catch(e){
            const { data } = e.response
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.detail,
              })
        }
        
    }
}