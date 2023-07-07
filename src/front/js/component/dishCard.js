import React, { useContext } from "react";
import "../../styles/dishcard.css"

export const DishCard = ({image, restaurant, name, price, description}) => {

    return (
        <div className="d-flex justify-content-center">
            <div className="card mb-3 dishcard-size">
                <div className="row g-0">
                    <div className="col-md-4 text-center">
                        <img src={image}
                            className="img-fluid rounded-start dishcard-image"
                            alt={`${name} image`}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body row">
                            <div className="col-9">
                                <h5 className="">{restaurant}</h5>
                                <p className="">{name}</p>
                                <p className="">
                                    {description}
                                </p>
                            </div>
                            <div className="col-3">
                                <h5 className="card-title text-center">{`${price}$`}</h5>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};