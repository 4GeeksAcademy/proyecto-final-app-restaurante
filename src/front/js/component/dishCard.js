import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/dishcard.css"
import { Context } from "../store/appContext";

export const DishCard = ({ dish }) => {

    return (
        <div className="d-flex justify-content-center">
            <div className="card mb-3 dishcard-size">
                <div className="row g-0">
                    <div className="col-md-4 text-center">
                        <img src="https://img.freepik.com/vector-gratis/vista-aerea-comida-plato_1308-46994.jpg?w=740&t=st=1688485116~exp=1688485716~hmac=af7911521d73e7e4eed0a324f22ccf5541b36f86e0e81252a1bf10f1d5f0c2c2"
                            className="img-fluid rounded-start dishcard-image"
                            alt="..."
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body row">
                            <div className="col-9">
                                <h5 className="">Rest. Hong Kong{/*dish.restaurant*/}</h5>
                                <p className="">Arroz chino con camarones{/*dish.name*/}</p>
                                <p className="">
                                    lorem asdasdasdasdasdasd  asdasd asd asd asdasddadas dasdad
                                    {/*dish.description*/}
                                </p>
                            </div>
                            <div className="col-3">
                                <h5 className="card-title text-center">20${/*dish.price*/}</h5>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};