
import { GET_CATEGORIES } from "./get"
import { useQuery } from "@apollo/client"



 export const getCategory = () => {
    const  { loading,data,error } = useQuery(GET_CATEGORIES)
    console.log("In categories",data)
    return data

 }