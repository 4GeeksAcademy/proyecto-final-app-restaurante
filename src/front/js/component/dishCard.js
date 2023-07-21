import React, { useContext } from "react";
import { Context } from '../store/appContext.js';
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';

import "../../styles/dishcard.css"



export const DishCard = ({ key, dish }) => {
    const { actions } = useContext(Context);
    const { id, image_url, restaurant_name, name, price, description } = dish
    // const dishId = user.restaurant.foods.id;
            // nav(`/restaurant/${dishId}`);

    return (
        <div className="d-flex justify-content-center" key={id}>
            <div className="card col-11 p-0 m-0">
                <div className="row m-2">
                    <div className="col-md-4 p-0">
                        <img src={image_url} className="img img-fluid rounded-1 border border-1" alt={`${name} image`} />
                    </div>
                    <div className="d-flex col-md-8 p-0 align-items-center">
                        <div className="card-body">
                            <div>
                                <h5 className="card-title fs-2"><strong>{name}</strong></h5>
                                <Link to={`/restaurant/${dish.restaurant_id}`} className="">{dish.restaurant_name}</Link>
                                <p className="card-text">{description}</p>
                            </div>
                            {location.pathname === '/restaurant/menu' && (
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btns-container">
                                        <Link to = {`/restaurant/menu/food/edit/${dish.id}`} className='btn btn-warning'><strong>Editar</strong></Link>
                                        <button className="btn btn-danger" onClick={() => actions.deleteDish(dish.id)}><strong>Borrar</strong></button>
                                    </div>
                                    <div className="fs-1 text-end"><strong>{`${price}$`}</strong></div>
                                </div>
                            )}
                            {location.pathname === '/' && (
                                <div className="fs-1 text-end"><strong>{`${price}$`}</strong></div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
