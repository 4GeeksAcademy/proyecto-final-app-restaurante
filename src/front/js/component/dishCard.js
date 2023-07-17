import React, { useContext } from "react";
import "../../styles/dishcard.css"



export const DishCard = ({ key, dish }) => {
    // const { actions } = useContext(Context);
    const { id, image, restaurant_name, name, price, description } = dish

    return (
        <div className="row m-3" key={id}>
            <div className="card p-0 m-0">
                <div className="row m-2">
                    <div className="col-md-4">
                        <img src={image} className="img-fluid rounded-start border border-1" alt={`${name} image`} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div>
                                <h5 className="card-title fs-2"><strong>{name}</strong></h5>
                                <p className="card-text">{restaurant_name}</p>
                                <p className="card-text">{description}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btns-container">
                                    <button className="btn btn-primary me-3">Editar</button>
                                    <button className="btn btn-danger" onClick={() => actions.deleteDish(dish.id)}>Borrar</button>
                                </div>
                                <p className="fs-1 text-center"><strong>{`${price}$`}</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="card">
                <img src={image} className="card-img-top" alt={`${name} image`} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{restaurant_name}</p>
                    <p className="card-text">{description}</p>
                    <div className="d-flex mx-2 justify-content-end">
                        <button className="btn btn-primary mx-4">Editar</button>
                        <button className="btn btn-danger" onClick={() => actions.deleteDish(dish.id)}>Borrar</button>
                        <strong>{`${price}$`}</strong>
                    </div>
                </div>
            </div> */}



            {/* <div className="card mb-3 dishcard-size">
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
                                <h5 className="card-title text-center"><strong>{`${price}$`}</strong></h5>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="d-flex mx-2 justify-content-end">
                    <button className="btn btn-primary mx-4">Editar</button>
                    <button className="btn btn-danger" onClick={() => actions.deleteDish(dish.id)}>Borrar</button>
                </div>
            </div> */}
        </div>
    );
};