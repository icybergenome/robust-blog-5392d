import jwt_decode from "jwt-decode";

export const isValid = (jwt) => {

        const decoded = jwt_decode(jwt);
        const date = Date.now()
        console.log("isVaer",decoded)
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

