import jwt_decode from "jwt-decode";
import { Jwt } from "jsonwebtoken";


export const isValid = (jwt) => {
    // const d_json = Jwt.verify()
        const decoded = jwt_decode(jwt);
        const date = Date.now()
        if (date >= decoded.exp * 1000) {
            return {
                valid : false,
                user_id: decoded.id 
            }
        }else{
            return {
                valid : true,
                user_id: decoded.id
            } 
        }
    
}

