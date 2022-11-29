import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { backendApi } from "../../../api";
import { checkingCredentials, deleteToken, setToken } from "./authSlice"

const MySwal = withReactContent(Swal);


export const getToken = (username, password, user_type="user") => {

    return async (dispatch, getState) => {

        dispatch(checkingCredentials());

        const params = new URLSearchParams();
        params.append("username", username);
        params.append("password", password);
        params.append("user_type", user_type);

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
            dispatch(setToken({token: data.access_token, userData: data.user_data, userType: user_type}));

        } catch(e){
            const { data } = e.response
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.detail,
            })
            dispatch(deleteToken());
        }
        
    }
}