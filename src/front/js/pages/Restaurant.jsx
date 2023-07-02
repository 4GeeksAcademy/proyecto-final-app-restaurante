import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

const Restaurant = () => {
  const { restaurantId } = useParams();
  const { actions } = useContext(Context);

  //Haré una consulta a la base de datos para traerme el restaurante.
  useEffect(() => {
    const { getRestaurant } = actions;

    console.log(getRestaurant);
  }, []);


  return (
    <>
      {restaurantId}
    </>
  );
};
export default Restaurant;