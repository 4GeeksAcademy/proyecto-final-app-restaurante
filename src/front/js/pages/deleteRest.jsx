import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { RestaurantCard } from "../component/restaurantCard.jsx";




export const DeleteRest = () => {
    const [restaurants, setRestaurants] = useState(
        [
            {
                id: 0,
                businessName: "Juan",
                rif: "13296624",
                phone: "2525343",
                location: "khkjhkhk",
            },
            {
                id: 1,
                businessName: "Andres",
                rif: "1234567",
                phone: "2525343",
                location: "khkjhkhk",
            },
            {
                id: 2,
                businessName: "Kelvin",
                rif: "0987655",
                phone: "2525343",
                location: "khkjhkhk",
            },
        ]
    );


    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <h2 className="text-center text-white rounded-1 title">Control Panel</h2>
                </div>

                {restaurants.map((restaurant, index) => {
                    console.log(restaurant);
                    return (
                        <RestaurantCard
                            key={index}
                            businessName={restaurants.businessName}
                            rif={restaurants.rif}
                            phone={restaurants.phone}
                            location={restaurants.location}
                        />

                        // <div className="card border border-1 rounded-4 my-5" key={index}>
                        //     <div className="card-body">
                        //         <h5 className="card-title">{restaurants.businessName}</h5>
                        //         <h6 className="card-subtitle mb-2 text-muted">{restaurants.rif}</h6>
                        //         <h6 className="card-subtitle mb-2 text-muted">{restaurants.phone}</h6>
                        //         <h6 className="card-subtitle mb-2 text-muted">{restaurants.location}</h6>
                        //         <div className="d-flex justify-content-end">
                        //             <button className="btn btn-success mx-4">More details</button>
                        //             <button className="btn btn-danger">Delete</button>
                        //         </div>
                        //     </div>
                        // </div>
                    );
                })}

            </div>
        </>
    );
};
