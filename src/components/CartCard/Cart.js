import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import Styles from "./Cart.module.css"
import CartModal from "../CartModal/CartModal";

const Cart = (props) => {
    const [showModal,setShowModal] = useState(false)
    const [isBtnAnimated,setIsBtnAnimated] = useState(false)

    const btnClass = `${Styles.cart} ${isBtnAnimated ? `${Styles.bump}`  : ''}`
    
    let productQuantity = 0

    if(props.cartItems.length > 0) {
        props.cartItems.forEach(item => {
            productQuantity += item.amount
        })
    }

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        if(props.cartItems.length === 0) {
            return
        }
        setIsBtnAnimated(true)

        const timer = setTimeout(() => {
            setIsBtnAnimated(false)
        }, 500)

        return () => {
            clearTimeout(timer)
        }
    }, [props.cartItems])

    return (
        <>
        {
            showModal && ReactDOM.createPortal(<CartModal cart={props.cartItems} onCloseModal={closeModal} />, document.getElementById("cart-modal"))
        }
        <div className={btnClass} onClick={openModal}>
            <FontAwesomeIcon icon={solid('cart-shopping')} />
            <p>Your cart</p>
            <div className={Styles.amount}>
                <p>{productQuantity}</p>
            </div>
        </div>
        </>
    )
}

export default Cart