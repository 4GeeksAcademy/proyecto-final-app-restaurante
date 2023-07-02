import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

const Restaurant = () => {
  const { restaurantId } = useParams();
  const { actions } = useContext(Context);
  const [restaurant, setRestaurant] = useState({})

  //Haré una consulta a la base de datos para traerme el restaurante.
  useEffect(() => {
    const { getRestaurant } = actions;
    setRestaurant(getRestaurant(restaurantId));
  }, []);


  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};
export default Restaurant;