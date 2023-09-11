import React, {useState} from "react";
import "./App.css"

import Header from "./components/Header/Header";
import MealsSummary from "./components/UI/MealsSummary/MealsSummary";
import FoodList from "./components/FoodList/FoodList";
import CartContext from "./store/CartContext";

const App = () => {
    const [cart,setCart] = useState([])

    const removeFromCartById = (id) => {
        setCart(prevValue => {
            let remove = false
            prevValue.forEach(element => {
                if(element.id === id && element.amount === 1) {
                    remove = true
                }
            })
            if(remove) {
                return prevValue.filter(item => item.id !== id)
            } else {
                return prevValue.map(element => {
                    if(element.id === id) {
                        return {
                            ...element,
                            amount : element.amount - 1
                        }  
                    } else {
                        return element
                    }
                })
            }
        })
    }

    const clearCart = () => {
        setCart([])
    }

    const addToCartById = (id) => {
        setCart(cart.map(element => {
            if(element.id === id) {
                return {
                    ...element,
                    amount : element.amount + 1
                }
            } else {
                return element
            }
        }))
    }

    const addItem = (item) => {
        setCart(prevValue => {
            let isAvailable = false

            prevValue.forEach(element => {
                if(element.name === item.name) {
                    isAvailable = true
                }
            })

            if(!isAvailable) {
                return [
                    ...prevValue,
                    item
                ]
            } else {
                return prevValue.map(element => {
                    if(element.name === item.name) {
                        return {
                            ...element,
                            amount : element.amount + item.amount
                        }
                    } else {
                        return element
                    }
                })
            }
        })
    }


    return (
        <React.Fragment>
        <CartContext.Provider value={{removeFromCart : removeFromCartById,addToCart : addToCartById, resetCart: clearCart}}>
        <Header cartItems={cart} />
        </CartContext.Provider>    
        <MealsSummary />
        <FoodList onAddItem={addItem} />
        </React.Fragment>
    )
}

export default App