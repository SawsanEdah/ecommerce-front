import { createContext, useReducer } from "react"
import cartReducer from "../Reducer/CartReducer"

export const CartContext=createContext()

export default function ShoppingCart( {children}){
    const[cart, dispatch]=useReducer(cartReducer, [])
    return(
        <CartContext.Provider value={{cart,dispatch}}>
                {children}
        </CartContext.Provider>
    )
}