import React, {useEffect,useState} from "react";

import Styles from "./FoodList.module.css"
import FoodItem from "../FoodItem/FoodItem";

const FoodList = (props) => {
    const [meals,setMeals] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
 
  
    const fetchMealData = async () => {
        setLoading(true)
        try {
        const res = await fetch("https://food-ordering-app-4b8ff-default-rtdb.firebaseio.com/Meals.json")
        const data = await res.json()

        const transformedMeals = []

        for(let i in data) {
            const obj = {
                id : i,
                ...data[i]
            }
            transformedMeals.push(obj)
        }

        setMeals(transformedMeals)
       } catch (e) {
        setError(true)
       }
       setLoading(false)
    }

    useEffect(() => {
        fetchMealData()     
    }, [])

    const allMeals = meals.map(meal => {
        return (
            <FoodItem
            name={meal.name}
            key={meal.id}
            description={meal.description}
            price={meal.price}
            onAddItem={props.onAddItem}
            />
        )
    })


    return (
        <div className={Styles.list}>
            {loading ? <p className={Styles.notification}>Loading ...</p> : error ? <p>Something went wrong</p> : allMeals}
        </div>
    )
}

export default FoodList