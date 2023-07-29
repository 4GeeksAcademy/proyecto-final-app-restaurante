import React, { useContext } from "react";
import { Context } from '../store/appContext.js';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { faHeart, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "../../styles/dishcard.css"

export const DishCard = ({ dish }) => {
    const { actions, store } = useContext(Context);
    const { favorites } = store
    const { id, image_url, restaurant_name, name, price, description, tags } = dish
    const navigate = useNavigate();

    //CAMBIO DE COLOR EN FAVORITO
    const isFavorite = favorites.some(fav => fav.id == dish.id);
    const [
        label,
        icon
    ] = isFavorite ? [
        'Quitar de favoritos',
        <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000", }} size="xl" />
    ] : [
        'Agregar a favoritos',
        <FontAwesomeIcon icon={faHeart} size="xl" />
    ]

    const handleDelete = async () => {
        const response = await actions.deleteDish(dish.id);

        if (response)
            navigate('/restaurant/menu');
    }

    const handleFav = async () => {
        const response = await actions.addFavorite({ "foodId": dish.id });
        console.log("foodId")

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
                            <div className="d-flex justify-content-end">
                                <button className="user-btn" onClick={handleFav}>
                                    <span className="fav-btn">{icon}</span>
                                </button>
                            </div>
                            <div>
                                <h5 className="card-title fs-2 m-0"><strong>{name}</strong></h5>
                                <div className='dishCard__tags-group'>
                                    {
                                        tags.split(',').map((tag, index) => {
                                            return (
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
                                        <Link to={`/restaurant/menu/food/edit/${dish.id}`}
                                            className='me-2'>
                                            <button className="button--orange--dish"><strong>Editar</strong></button>
                                        </Link>
                                        <button className="button--red--dish text-white" onClick={() => { handleDelete() }}><strong>Borrar</strong></button>
                                    </div>

                                    <div className="d-flex align-items-center fs-1 text-end">

                                        <div>
                                            <strong>{`${price}$`}</strong>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {location.pathname === '/' && (

                                <div className="d-flex justify-content-between align-items-center fs-1 text-end">
                                    <div>
                                        <button className="user-btn" onClick={"like"}>
                                            <span className="like-btn"><FontAwesomeIcon icon={faThumbsUp} size="2xs" /></span>
                                        </button>
                                        <button className="user-btn" onClick={"dislike"}>
                                            <span className="dlike-btn"><FontAwesomeIcon icon={faThumbsDown} size="2xs" /></span>
                                        </button>
                                    </div>
                                    <strong>{`${price}$`}</strong>
                                </div>
                            )}
                            {location.pathname === '/favorite' && (

                                <div className="d-flex justify-content-between align-items-center fs-1 text-end">
                                    <div>
                                        <button className="user-btn" onClick={"like"}>
                                            <span className="like-btn"><FontAwesomeIcon icon={faThumbsUp} size="2xs" /></span>
                                        </button>
                                        <button className="user-btn" onClick={"dislike"}>
                                            <span className="dlike-btn"><FontAwesomeIcon icon={faThumbsDown} size="2xs" /></span>
                                        </button>
                                    </div>
                                    <strong>{`${price}$`}</strong>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
