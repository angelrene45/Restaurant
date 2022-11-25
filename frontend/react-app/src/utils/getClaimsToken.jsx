import jwt from 'jwt-decode'


export const getClaimsToken = () => {
    const token = localStorage.getItem('TOKEN');
    const token_decoded = jwt(token); // decode token
    return { ...token_decoded } // share claims from token
}