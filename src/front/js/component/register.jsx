import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/home.css";

const initialState = {

    restaurantName: "",
    restaurantRif: "",
    phone: "",
    email: "",
    location: "",
    password: "",

}

export const Register = () => {
    const { actions } = useContext(Context);
    const [user, setUser] = useState(initialState);

    //EVENTOS
    const handleRegister = (e) => {
        // e.preventDefault();

        const formData = new FormData();

        formData.append("restaurantName", user.restaurantName);
        formData.append("restaurantRif", user.restaurantRif);
        formData.append("name", user.phone);
        formData.append("email", user.email);
        formData.append("name", user.location);
        formData.append("password", user.password);

        //AQUI VA LA FUNCION FLUX:
        const response = actions.restaurantRegister(formData);

        console.log("Registrando al usuario...");
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <>
            {/* FORMULARIO DE REGISTRO */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-lx-5 login_container">
                        <h2 className="text-center bg-danger text-white rounded-1">
                            <strong>Create Account</strong>
                        </h2>


                        <form className="needs-validation" noValidate>

                            <div className="form-group mt-4">
                                <label htmlFor="restaurantName">Business Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="restaurantName"
                                    name="restaurantName"
                                    placeholder="Enter your business name"
                                    onChange={handleChange}
                                    value={user.restaurantName}
                                    required
                                ></input>
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="restaurantRif">R.I.F</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="restaurantRif"
                                    name="restaurantRif"
                                    placeholder="Enter your business RIF"
                                    onChange={handleChange}
                                    value={user.restaurantRif}
                                    required
                                ></input>
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    onChange={handleChange}
                                    value={user.phone}
                                    required
                                ></input>
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Enter an email address"
                                    onChange={handleChange}
                                    value={user.email}
                                    required
                                ></input>
                            </div>

                            <div className="form-group mt-4">
                                <label htmlFor="location">Location Link</label>
                                <input
                                    type="url"
                                    className="form-control"
                                    id="location"
                                    name="location"
                                    placeholder="Enter a valid URL"
                                    onChange={handleChange}
                                    value={user.location}
                                    required
                                ></input>
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Choose a password"
                                    onChange={handleChange}
                                    value={user.password}
                                    required
                                ></input>

                            </div>


                            <div>
                                <button
                                    type="button"
                                    className="btn btn-success text-white w-100 mt-3"
                                    onClick={(e) => handleRegister()}
                                >
                                    Join in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
