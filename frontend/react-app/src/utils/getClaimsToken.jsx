import jwt from 'jwt-decode'


export const getClaimsToken = () => {
    const token = localStorage.getItem('TOKEN');
    try{
        const token_decoded = jwt(token); // decode token
        return { ...token_decoded } // share claims from token
    }catch(error){
        console.log("No token decoded")
        return {}
    }
   
}