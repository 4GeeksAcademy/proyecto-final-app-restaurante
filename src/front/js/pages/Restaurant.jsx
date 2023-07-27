import React, { useContext, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Context } from '../store/appContext';
import EditAvatar from '../component/EditAvatar.jsx';
import PlaceImage from '../component/PlaceImage.jsx';
import AddRestaurantImage from '../component/AddRestaurantImage.jsx';
import '../../styles/restaurant.css';

const Restaurant = () => {
  const { restaurantId } = useParams();
  const { actions, store } = useContext(Context);
  const { getOneRestaurant } = actions;
  const { restaurant, user } = store;
  const isOwner = user && user.restaurant
    ? user.restaurant.id == restaurantId
    : false;
  const location = useLocation(); //PARA ENRUTAR FUNCIONAL

  useEffect(() => {
    getOneRestaurant(restaurantId);
  }, []);

  console.log(user)

  return (
    <>
      {
        restaurant != null
          ? <div className='container panel mt-4 p-3 bg-white border border-1 rounded-3' >
            <h2 className='text-center bg-danger p-2 text-white rounded-1 title'>
              Panel de Control
            </h2>
            <div className='row border border-1 m-4 restaurant__content'>
              <div className='restaurant__image col-12 col-sm-3 order-sm-0'>
                {
                  restaurant?.user_avatar == null ?
                    <img
                      src="https://i.ibb.co/3s8jPQZ/Tu-logo-aqui.png"
                      alt="restaurant_avatar"
                      className='restaurant_avatar' />
                    :
                    <img
                      src={restaurant?.user_avatar}
                      alt="restaurant_avatar"
                      className='restaurant_avatar' />
                }

                {
                  isOwner &&
                  <EditAvatar
                    restaurantId={restaurantId} />
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
                    Teléfono de contacto:
                  </span>
                  {
                    restaurant.phone
                  }
                </p>
                <p className='information-group'>
                  <span className='restaurant__label'>
                    Link de ubicación:
                  </span>
                  <a href={restaurant.location} target="_blank">Click here!</a>
                </p>
                <p className="restaurant__description">
                  {
                    restaurant.description
                  }
                </p>
                <div className='d-flex mt-3 justify-content-end'>
                  {
                    isOwner &&
                    <Link to={`edit`} className='col-4 me-2'>
                      <button className="button--orange--restaurant">
                        <strong>Editar perfil</strong>
                      </button>
                    </Link>
                  }
                  {
                    isOwner &&
                    <Link to='/restaurant/menu' className='col-4'>
                      <button className="button--orange--restaurant">
                        <strong>Editar menu</strong>
                      </button>
                    </Link>
                  }
                </div>
              </div>
            </div>

            <div className='container mt-4 p-4 bg-white rounded-3'>
              
                {
                  !restaurant?.image &&
                  <div>
                    <div>
                      <h3 className='text-center'>
                        Galeria de imágenes
                      </h3>
                    </div>

                    <div className='column col-11'>
                      {
                        restaurant.image.map(
                          image => {
                            return (
                              <PlaceImage
                                key={image.id}
                                image={image}
                                deleteable={isOwner}
                                restaurantId={restaurantId} />)
                          }
                        )
                      }
                    </div>
                  </div>
                }
              
              <div className='w-100'>
                {
                  isOwner &&
                  <>
                    <div>
                      <h3 className='text-center'>
                        Galeria de imágenes
                      </h3>
                    </div>
                    <AddRestaurantImage
                      restaurantId={restaurantId} />
                  </>
                }
              </div>
            </div>
          </div >
          : <h1>Restaurant not found</h1>
      }
    </>
  );
};
export default Restaurant;