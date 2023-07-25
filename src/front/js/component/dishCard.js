import React, { useContext } from "react";
import { Context } from '../store/appContext.js';
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

import "../../styles/dishcard.css"

export const DishCard = ({ dish }) => {
    const { actions, store } = useContext(Context);
    const { id, image_url, restaurant_name, name, price, description, tags } = dish
    const navigate = useNavigate();

    const handleDelete = async () => {
        const response = await actions.deleteDish(dish.id);
        
        if(response)
            navigate('/restaurant/menu');
    }


    return (
        <div className="d-flex m-3 justify-content-center" key={id}>
            <div className="card col-11 p-0 m-0">
                <div className="row m-2">
                    <div className="col-md-4">
                        <img src={image_url} className="img img-fluid rounded-1 border border-1" alt={`${name} image`} />
                    </div>
                    <div className="d-flex col-md-8 p-0 align-items-center">
                        <div className="card-body p-2">
                            <div>
                                <h5 className="card-title fs-2 m-0"><strong>{name}</strong></h5>
                            <div className='dishCard__tags-group'>
                            {
                                tags.split(',').map( (tag, index) => {
                                    return(
                                        <span className="badge bg-info dishCard__tag ms-0 mx-1" key={index}>
                                            {tag.trim()}
                                        </span>
                                    )
                                })
                            }
                            </div>
                                <Link to={`/restaurant/${dish.restaurant_id}`} className="">{dish.restaurant_name}</Link>
                                <p className="card-text">{description}</p>
                            </div>
                            {location.pathname === '/restaurant/menu' && (
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btns-container">
                                        <Link to={`/restaurant/menu/food/edit/${dish.id}`} className='btn btn-warning me-2'><strong>Editar</strong></Link>
                                        <button className="btn btn-danger" onClick={() => {handleDelete()} }><strong>Borrar</strong></button>
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
