import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect,useState } from 'react';


const AvailableMeals = () => {
  const [meals,setMeals] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [httpError,setHttpError] = useState()

  useEffect(()=> {
    //harus gini soalnya gabisa kalo async di useEffect
    //kalo ngambil data dari db harusnya di useeffect terus
    const fetchMeals = async () => {
      setIsLoading(true)
      const DUMMY_MEALS = await fetch('https://practice-841a5-default-rtdb.firebaseio.com/meals.json')

      if(!DUMMY_MEALS.ok){
        throw new Error('Somethin wrong')
      }
      const data = await DUMMY_MEALS.json()      
      
      const mealsList = [];

      for (const key in data){
        mealsList.push({
          id:key,
          key:key,
          name:data[key].name,
          description:data[key].description,
          price:data[key].price,
        })
      }
      setMeals(mealsList)
      setIsLoading(false)
    }

      // kalo dia async, bakal always return apromise
      // kalo return throw error gitu, harus diatambah await sebelum manggil fetch meals(tapi berarti useEffect hrs ditambahin async)
      //solusi diatas gabisa makanya pake .catch kalo mau try catch tapi function dalemnya async
      //untuk async function that returns promise --> use .then() for success case, use .catch() for handling error
      fetchMeals().catch((err)=>{
        setIsLoading(false)
        setHttpError(err.message)
        console.log(err.message)
      })

  },[]) //only run when the components run first time

  if (isLoading){
    return (
      <section className={classes.MealsLoading}>
        <p>Is Loading....</p>
      </section>
    )
  }

  if(httpError){
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }
  //map itu buat array
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      {httpError&&<p className={classes.MealsError}>{httpError}</p>}
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
