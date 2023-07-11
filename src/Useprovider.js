import React ,{useState} from "react";
import Mycontext from "./Context";

const UserProvider = ({children})=>{
    const[CartItems,setCartItems]=useState([]);

    return(
    <Mycontext.Provider value={{CartItems,setCartItems}}>{children}</Mycontext.Provider>
    )
}
export default UserProvider;