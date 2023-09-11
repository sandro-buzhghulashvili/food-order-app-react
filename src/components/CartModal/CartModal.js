import React, {useContext,useState} from "react";

import Styles from "./CartModal.module.css"
import CartItem from "../CartItem/CartItem";
import CartContext from "../../store/CartContext";
import MealOrderForm from "../MealOrderForm/MealOrderForm";

const CartModal = (props) => {
    const [successfullyOrdered,setSuccessfullyOrdered] = useState(false)
    const [loading,setLoading] = useState(false)


    const ctx = useContext(CartContext)

    let totalAmount = 0

    const removeFromCart = (id) => {
        ctx.removeFromCart(id)
    }

    const addToCart = (id) => {
        ctx.addToCart(id)
    }
    

    const orderMeal = (data) => {
        ctx.resetCart()
        setLoading(true)
        const orderObj = {
            ...data,
            orderedMeals : props.cart
        }
        fetch("https://food-ordering-app-4b8ff-default-rtdb.firebaseio.com/Orders.json", {
            method : 'POST',
            body : JSON.stringify(orderObj),
            headers : {
                'Content-type' : 'application/json'
            }
        })
        .then(res=> res.json())
        .then(data => {
            setSuccessfullyOrdered(true)
            setLoading(false)
            console.log(data)
        })
        .catch(error => {
            setSuccessfullyOrdered("Error")
            setLoading(false)
        })
    }

    const allCartItems = props.cart.map(element => {
        return (
        <CartItem
        id={element.id}
        key={element.id}
        name = {element.name}
        price = {element.price}
        amount = {element.amount}
        onRemove = {removeFromCart}
        onAdd = {addToCart}
        />
        )
    })

    if(props.cart.length > 0) {
        props.cart.forEach(item => {
            totalAmount += (item.price * item.amount)
        })
    }

    let response = props.cart.length === 0 && "There are no meals in the cart"

    if(loading) {
        response = "Loading ..."
    } else if (successfullyOrdered === "Error") {
        response = "Something went wrong"
    } else if(successfullyOrdered) {
        response = "Successfully ordered"
    }

    return (
        <div className={Styles.backdrop}>
            <div className={Styles.modal}>
            {  props.cart.length > 0 ?

            <>
            <ul>
                {allCartItems}
            </ul>
            <div className={Styles.total}>
                <h1>Total Amount</h1>
                <h1>${totalAmount.toFixed(2)}</h1>
            </div>
            </> :
            <h1 className={Styles.flash}>{response}</h1>
            }
            {
                props.cart.length > 0 && <MealOrderForm onOrderMeal={orderMeal} />
            }
            <div className={Styles["btn-group"]}>
                <button onClick={props.onCloseModal}>Close</button>
            </div>
            </div>
        </div>
    )
}

export default CartModal