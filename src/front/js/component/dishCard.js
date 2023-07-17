import React from "react";
import { Link } from "react-router-dom";
import "../../styles/dishcard.css"

export const DishCard = ({ dish }) => {
    console.log(dish);
    return (
        <div className="row m-2">
            <div className="card mb-3 dishcard-size">
                <div className="row g-0">
                    <div className="col-md-4 text-center">
                        <img src={dish.image_url}
                            className="img-fluid rounded-start dishcard-image"
                            alt={`${dish.name} image`}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body row">
                            <div className="col-9">
                                <Link to={`/restaurant/${dish.restaurant_id}`} className="">{dish.restaurant_name}</Link>
                                <p className="">{dish.name}</p>
                                <p className="">
                                    {dish.description}
                                </p>
                            </div>
                            <div className="col-3">
                                <h5 className="card-title text-center">{`${dish.price}$`}</h5>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="d-flex mx-2 justify-content-end">
                    <button className="btn btn-primary mx-4">Editar</button>
                    <button className="btn btn-danger" onClick={() => actions.deleteDish(dish.id)}>Borrar</button>
                </div>
            </div>
        </div>
    );
};