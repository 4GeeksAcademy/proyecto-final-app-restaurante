import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { onValidateRegister } from "../util.js"

const initialState = {                                              //ESTADO INICIAL DEL FORM REGISTER
    restaurantName: "",
    restaurantRif: "",
    phone: "",
    location: "",
    userName: '',
}

export const RegisterRestaurant = () => {
    const { actions } = useContext(Context);
    const [user, setUser] = useState(initialState);                 //GUARDA ESTADO INICIAL DEL FORM REGISTER
    const [errors, setErrors] = useState({});                       //GUARDA ERRORES DE VALIDACION
    const navigate = useNavigate();

    const handleChange = (e) => {                                   //MANEJA LOS CAMBIOS EN LOS CAMPOS DEL FORM REGISTER
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {                                 //MANEJA EL ENVIO DEL FORM REGISTER
        e.preventDefault()
        const err = onValidateRegister(user)                                //MANEJA LOS ERRORS DE LAS VALIDACIONES
        console.log(err)
        setErrors(err)

        console.log(Object.keys(err).length);                       //IMPRESION DE QTY DE ERRORES EN EL FORMULARIO


        if (Object.keys(err).length === 0) {                            //SI NO HAY ERRORES...

            const formData = new FormData()                            //AGREGA Y ENVIA LOS VALORES DEL FORMULARIO

            formData.append("restaurantName", user.restaurantName);
            formData.append("restaurantRif", user.restaurantRif);
            formData.append("restaurantPhone", user.phone);
            formData.append("restaurantLocation", user.location);
            formData.append("userName", user.userName);

            const response = await actions.restaurantRegister(formData);      //FUNCION FLUX

            if (response)
                navigate('/');
        }
    }

    return (
        <>
            {/* FORMULARIO DE REGISTRO */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="bg-white panel border border-1 p-5 rounded-3 col-12 col-sm-9 col-md-7 col-lg-6 col-lx-5 login_container">
                        <h2 className="text-center bg-danger text-white rounded-1">
                            <strong>Crear una Cuenta</strong>
                        </h2>

                        <form className="needs-validation" noValidate onSubmit={handleRegister}>

                            <div className="form-group mt-4">
                                <label htmlFor="userName">Nombre usuario</label>
                                <input
                                    type="text"
                                    className="form-control border"
                                    id="userName"
                                    name="userName"
                                    placeholder="Ingresa el nombre del usuario"
                                    onChange={handleChange}
                                    value={user.userName}
                                    required
                                ></input>
                                {errors.userName && <div className="alert p-0 m-0 bg-none text-danger">{errors.restaurantName}</div>}
                            </div>

                            <div className="form-group mt-4">
                                <label htmlFor="restaurantName">Nombre Restaurant</label>
                                <input
                                    type="text"
                                    className="form-control border"
                                    id="restaurantName"
                                    name="restaurantName"
                                    placeholder="Ingresa el nombre de tu negocio"
                                    onChange={handleChange}
                                    value={user.restaurantName}
                                    required
                                ></input>
                                {errors.restaurantName && <div className="alert p-0 m-0 bg-none text-danger">{errors.restaurantName}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="restaurantRif">R.I.F</label>
                                <input
                                    type="text"
                                    className="form-control border"
                                    id="restaurantRif"
                                    name="restaurantRif"
                                    placeholder="Ingrese el RIF de su negocio"
                                    onChange={handleChange}
                                    value={user.restaurantRif}
                                    required
                                ></input>
                                {errors.restaurantRif && <div className="alert p-0 m-0 bg-none text-danger">{errors.restaurantRif}</div>}

                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="phone">Teléfono de contacto</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    placeholder="Ingrese un numero de teléfono"
                                    onChange={handleChange}
                                    value={user.phone}
                                    required
                                ></input>
                                {errors.phone && <div className="alert p-0 m-0 bg-none text-danger">{errors.phone}</div>}
                            </div>

                            <div className="form-group mt-4">
                                <label htmlFor="location">Link de ubicación</label>
                                <input
                                    type="url"
                                    className="form-control"
                                    id="location"
                                    name="location"
                                    placeholder="https://..."
                                    onChange={handleChange}
                                    value={user.location}
                                    required
                                ></input>
                                {errors.location && <div className="alert p-0 m-0 bg-none text-danger">{errors.location}</div>}
                            </div>

                            {/* BOTON DE ENVIO */}
                            <div>
                                <button
                                    type="submit"
                                    className="button--login-register w-100 mt-3"
                                >
                                    <strong>Únete a nosotros!</strong>
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
};





