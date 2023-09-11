import React, {useState} from "react";
import { nanoid } from 'nanoid'

import Styles from "./FoodItem.module.css"

const FoodItem = (props) => {
    const [amount,setAmount] = useState(1)

    const amountHandler = (e) => {
      setAmount(Number(e.target.value))
    }

    const addToCart = () => {
      const obj = {
        name : props.name,
        price : props.price,
        amount : amount,
        id : nanoid()
      }
      props.onAddItem(obj)
      setAmount(1)
    }
    return (
        <div className={Styles.card}>
          <div className={Styles["food-info"]}>
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <span>$ {props.price}</span>
          </div>
          <div className={Styles["buy-options"]}>
            <span>Amount</span>
            <input type="number" min="1" onChange={amountHandler} value={amount}/>
            <button onClick={addToCart}>+ Add</button>
          </div>
        </div>
    )
}

export default FoodItem