import React, {useEffect, useState} from "react";

import styles from "./MealOrderForm.module.css"
import useInput from "../../hooks/useInput";

const MealOrderForm = (props) => {
    const [formIsValid,setFormIsValid] = useState(false)
 
    const {
        enteredValue : enteredName,
        isValid : nameIsValid,
        hasError : nameHasError,
        valueChangeHandler : nameChangeHandler,
        valueBlurHandler : nameBlurHandler,
        resetValueHandler : nameResetHandler
    } = useInput(value => value.trim().length !== 0)

    const {
        enteredValue : enteredAddress,
        isValid : addressIsValid,
        hasError : addressHasError,
        valueChangeHandler : addressChangeHandler,
        valueBlurHandler : addressBlurHandler,
        resetValueHandler : addressResetHandler
    } = useInput(value => value.trim().length !== 0)

    const submitHandler = event => {
        event.preventDefault()
        const obj = {
            name : enteredName,
            address : enteredAddress
        }
        props.onOrderMeal(obj)
        nameResetHandler()
        addressResetHandler()
    }

    useEffect(() => {
        if(nameIsValid && addressIsValid) {
            setFormIsValid(true)
        } else {
            setFormIsValid(false)
        }
    }, [nameIsValid,addressIsValid])


    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles['form-control']}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" className={nameHasError ? styles.invalid : ""} value={enteredName} onChange={nameChangeHandler} onBlur={nameBlurHandler}/>
                {nameHasError && <p className={styles.error}>Please enter the name</p>}
            </div>
            <div className={styles['form-control']}>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" className={addressHasError ? styles.invalid : ""} value={enteredAddress} onChange={addressChangeHandler} onBlur={addressBlurHandler}/>
                {addressHasError && <p className={styles.error}>Please enter an address</p>}
            </div>
            <button disabled={!formIsValid} className={styles.submit}>Submit</button>
        </form>
    )
}

export default MealOrderForm