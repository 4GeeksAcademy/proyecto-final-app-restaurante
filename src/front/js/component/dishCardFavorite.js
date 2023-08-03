import React, { useContext, useEffect, useState } from "react";
import { Context } from '../store/appContext.js';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { faHeart, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "../../styles/dishcard.css"

export const DishCardFavorite = ({ dish }) => {
    const { actions, store } = useContext(Context);
    const { favorites } = store
    const { id, tags, food } = dish
    const navigate = useNavigate();
    const [favorite, setFavorite] = useState(favorites.some(fav => fav.food.id == dish.id))
    

    //CAMBIO DE COLOR EN FAVORITO
    
    
    const searchFavorite = () => {
        const isFavorite = favorites.some(fav => fav.food.id == dish.id);
        setFavorite(isFavorite)
    }

    const icon = favorite ? <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000", }} size="xl" />
        : <FontAwesomeIcon icon={faHeart} size="xl" />
    
        //console.log(dish.id, isFavorite)
        

    const handleDelete = async () => {
        const response = await actions.deleteDish(dish.id);

        if (response)
            navigate('/restaurant/menu');
    }

    const handleFav = async () => {
        const response = await actions.addFavorite({ "foodId": dish.id });
    }

    console.log(favorite)

    // useEffect(() => {
    //     searchFavorite()
    // }, [])

    return (
        <div className="d-flex m-3 justify-content-center">
            <div className="card col-11 p-0 m-0" key={id}>
                <div className="row m-2">
                    <div className="col-md-4">
                        <img src={food?.image_url} className="img img-fluid rounded-1 border border-1" alt={`${food?.name} image`} />
                    </div>
                    <div className="d-flex col-md-8 p-0 align-items-center">
                        <div className="card-body p-2">
                            {/* <div className="d-flex justify-content-end">
                                <button className="user-btn" onClick={handleFav}>
                                    <span className="fav-btn">{icon}</span>
                                </button>
                            </div> */}
                            <div>
                                <h5 className="card-title fs-2 m-0"><strong>{food?.name}</strong></h5>
                                <div className='dishCard__tags-group'>
                                    {
                                        food?.tags?.split(',').map((tag, index) => {
                                            return (
                                                <span className="badge bg-info dishCard__tag ms-0 mx-1" key={index}>
                                                    {tag.trim()}
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                                <Link to={`/restaurant/${dish?.restaurant_id}`} className="">{food?.restaurant_name}</Link>
                                <p className="card-text">{food?.description}</p>
                            </div>

                            {location?.pathname === '/restaurant/menu' && (
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btns-container">
                                        <Link to={`/restaurant/menu/food/edit/${dish.id}`}
                                            className='me-2'>
                                            <button className="button--orange--dish"><strong>Editar</strong></button>
                                        </Link>
                                        <button className="button--red--dish text-white" onClick={() => { handleDelete() }}><strong>Borrar</strong></button>
                                    </div>

                                    <div className="d-flex align-items-center fs-1 text-end">

                                        <div>
                                            <strong>{`${food?.price}$`}</strong>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {location?.pathname === '/' && (

                                <div className="d-flex justify-content-end align-items-center fs-1 text-end">
                                    {/* <div>
                                        <button className="user-btn" onClick={"like"}>
                                            <span className="like-btn"><FontAwesomeIcon icon={faThumbsUp} size="2xs" /></span>
                                        </button>
                                        <button className="user-btn" onClick={"dislike"}>
                                            <span className="dlike-btn"><FontAwesomeIcon icon={faThumbsDown} size="2xs" /></span>
                                        </button>
                                    </div> */}
                                    <strong>{`${food?.price}$`}</strong>
                                </div>
                            )}
                            {location?.pathname === '/favorite' && (

                                <div className="d-flex justify-content-end align-items-center fs-1 text-end">
                                    {/* <div>
                                        <button className="user-btn" onClick={"like"}>
                                            <span className="like-btn"><FontAwesomeIcon icon={faThumbsUp} size="2xs" /></span>
                                        </button>
                                        <button className="user-btn" onClick={"dislike"}>
                                            <span className="dlike-btn"><FontAwesomeIcon icon={faThumbsDown} size="2xs" /></span>
                                        </button>
                                    </div> */}
                                    <strong>{`${food?.price}$`}</strong>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
