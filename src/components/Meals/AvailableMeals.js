// AvailableMeals component
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [httpError, setHttpError] = useState();
  // in this case, because useEffect() will always run on INITIAL COMPONENT LOAD,
  // setting initial state of "isLoading" to TRUE is okay.
  const [isLoading, setIsLoading] = useState(true);

  // fetching the list of available meals on load + when meals list is updated
  useEffect(() => {
    fetch("https://react-http-fd65a-default-rtdb.firebaseio.com/meals.json")
      .then((res) => res.json())
      .then((data) => {
        // because we receive an OBJECT from the fetch() operation
        // we need to now TRANSFORM the data into an ARRAY
        // by creating a new array object, "loadedMeals", and pushing in the values
        const loadedMeals = [];
        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price
          });
        }

        setMeals(loadedMeals);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  }, [meals]);

  // on initial component load, we want to show the "Loading..." text
  // before the meals get loaded
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  // whenever we get an error, we want to show the error on the screen
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
