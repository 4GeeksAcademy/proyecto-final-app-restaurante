import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Context } from '../store/appContext';
import EditAvatar from '../component/EditAvatar.jsx';
import PlaceImage from '../component/PlaceImage.jsx';
import AddRestaurantImage from '../component/AddRestaurantImage.jsx';
import '../../styles/restaurant.css';

const Restaurant = () => {
  const { restaurantId } = useParams();
  const { actions } = useContext(Context);
  const [restaurant, setRestaurant] = useState({})
  const { store } = useContext(Context)
  const { user } = store;
  const isOwner = user && user.restaurant
    ? user.restaurant.id == restaurantId
    : false;
  const location = useLocation(); //PARA ENRUTAR FUNCIONAL

  const getCurrentRestaurant = async () => {
    const { getOneRestaurant } = actions;
    const response = await getOneRestaurant(restaurantId);
    setRestaurant(response);
  }

  useEffect(() => {
    getCurrentRestaurant();
  }, []);

  return (
    <>
      {
        restaurant != null
          ? <div className='container restaurant__container' >
            <h2 className='restaurant__title text-light'>
              Dashboard
            </h2>
            <div className='row restaurant__content'>
              <div className='restaurant__image col-12 col-sm-3 order-sm-0'>
                <img
                  src={restaurant.user_avatar}
                  alt="restaurant_avatar"
                  className='restaurant_avatar' />
                {
                  isOwner &&
                  <EditAvatar />
                }
              </div>
              <div className='restaurant__information col-12 col-sm-9 order-sm-1'>
                <h3 className='restaurant__name'>
                  {
                    restaurant.name
                  }
                </h3>
                <div className='information-group'>
                  <a className='restaurant__social' href={restaurant.facebook_url} target='_blank'><i className="bi bi-facebook"></i></a>
                  <a className='restaurant__social' href={restaurant.twitter_url} target='_blank'><i className="bi bi-twitter"></i></a>
                  <a className='restaurant__social' href={restaurant.instagram_url} target='_blank'><i className="bi bi-instagram"></i></a>
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
                {
                  isOwner &&
                  <Link to={`edit`} className='btn btn__edit button-green btn--restaurantEdit'>
                    Edit profile
                  </Link>
                }
              </div>
            </div>
            <div className='row gallery'>
              <h3 className='col-12'>
                Place
              </h3>
              {
                restaurant.image && restaurant.image.map(
                  image => {
                    return (
                      <PlaceImage 
                        key={image.id} 
                        image={image}
                        deleteable={isOwner}
                        refresh={getCurrentRestaurant} />
                    )
                  }
                )
              }
              {
                isOwner &&
                  <AddRestaurantImage />
              }
            </div>
            {
              isOwner &&
              <Link to='/restaurant/food' className='btn btn__edit button-red btn--restaurantEdit'>
                Edit menu
              </Link>
            }
          </div >
          : <h1>Restaurant not found</h1>
      }
    </>
  );
};
export default Restaurant;