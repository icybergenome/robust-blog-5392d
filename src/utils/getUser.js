import { isValid } from '../utils/helpers/isValid'

export const Userdetails = () => {
    try{
        const user = JSON.parse(localStorage.getItem("userInfo"))
        return user
    }catch(err){
        return null
    }
    
}

export const userAuth = () => {
    try{
        const token = localStorage.getItem("jwtToken")
        const valid = isValid(token)
        return valid
    }catch(e){
        return {
            valid: false,
            user_id: null
        }
    }
    

}
