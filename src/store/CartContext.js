import React from "react"

const CartContext = React.createContext({
    removeFromCart : () => {},
    addToCart : () => {}
})

export default CartContext