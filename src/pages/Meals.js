import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Meals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState(location?.state?.category);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (!location?.state?.category) {
      navigate('/menu');
    }

    const fetchMeals = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category?.strCategory}`);
        setMeals(response.data.meals);
        console.log(response.data.meals);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, [category]);

  const handleFavorite = (meal) => {
    console.log('Meal marked as favorite:', meal);
  };

  return (
    <div>
      <h2 className='text-center mb-4'>Meals in the category: {category?.strCategory}</h2>
      {meals && meals.map((meal) => (
        <div class="card mb-3" key={meal.idMeal}>
          <div class="row g-0">
            <div class="col-md-4">
              <img src={meal.strMealThumb} class="img-fluid rounded-start w-50" alt={meal.strMeal} />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{meal.strMeal}</h5>
                <p class="card-text">Meal ID: {meal.idMeal}</p>
                <a onClick={() => handleFavorite(meal)} class="btn btn-primary">Mark as Favorite</a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Meals;