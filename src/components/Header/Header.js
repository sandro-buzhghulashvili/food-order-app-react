import React from "react";

import Styles from "./Header.module.css"
import mealsImage from "../../assets/images/meals.jpg"
import Cart from "../CartCard/Cart"

const Header = (props) => {
    return (

        
        <nav>
            <header className={Styles.header}>
                <h1>ReactMeals</h1>
                <Cart cartItems={props.cartItems} />
            </header>
            <div className={Styles["main-image"]}>
            <img src={mealsImage} />
            </div>
        </nav>
    )
}

export default Header