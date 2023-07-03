import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/restaurant.css';

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
    <div className='container restaurant__containr'>
      <h2 className='restaurant__title text-light'>
        Dashboard
      </h2>
      <div className='row restaurant__content'>
        <img
          src="https://imagen-ai.com/wp-content/uploads/2022/07/open-graph-default.jpg"
          alt="restaurant_avatar"
          className='restaurant_avatar col-12 col-sm-3 order-sm-0' />
        <div className='restaurant__information col-12 col-sm-9 order-sm-1'>
          <h3 className='restaurant__name'>
            {
              restaurant.name
            }
          </h3>
          <div className='information-group'>
            <span className='restaurant__label'>Social Media</span>
            <a href={restaurant.facebook_url} target='_blank'><i className="bi bi-facebook"></i></a>
            <a href={restaurant.twitter_url} target='_blank'><i className="bi bi-twitter"></i></a>
            <a href={restaurant.instagram_url} target='_blank'><i className="bi bi-instagram"></i></a>
          </div>
          <p className='information-group'>
            <span className='restaurant__label'>
              Rif:
            </span>
            {
              restaurant.rif
            }
          </p>
          <p className='information-group'>
            <span className='restaurant__label'>
              Phone:
            </span>
            {
              restaurant.phone
            }
          </p>
          <p className='information-group'>
            <span className='restaurant__label'>
              Location link:
            </span>
            <a href={restaurant.location} target="_blank">Click here!</a>
          </p>
          <p className="restaurant__description">
            {
              restaurant.description
            }
          </p>
        </div>
      </div>
    </div>
  );
};
export default Restaurant;