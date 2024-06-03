import { jwtDecode } from 'jwt-decode'

const DecodeToken = () => {
    const token = localStorage.getItem("token")
    
    
    if (token) {
        const userDecode = jwtDecode(token)
        const {roles,_id,name} = userDecode
        return {roles,_id,name}
    }
    return token
}

export default DecodeToken


