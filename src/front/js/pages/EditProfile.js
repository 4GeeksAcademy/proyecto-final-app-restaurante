import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import "../../styles/editProfile.css"
import { Loader } from "../component/loader.jsx";

const initialValues = {
    name: "",
    // rif: "",
    phone: "",
    // email: "",
    location: "",
    description: "",
    password: "",
    facebook: "",
    instagram: "",
    twitter: ""
}

const EditProfile = () => {
    const { actions, store } = useContext(Context);
    const [restaurant, setRestaurant] = useState(initialValues);
    const { restaurantId } = useParams();
    const navigate = useNavigate();

    const handleEdit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("restaurantName", restaurant.name);
        // formData.append("restaurantRif", restaurant.rif);
        formData.append("restaurantPhone", restaurant.phone);
        // formData.append("userEmail", restaurant.email);
        formData.append("restaurantLocation", restaurant.location);
        formData.append("restaurantDescription", restaurant.description);
        formData.append("userPassword", restaurant.password);
        formData.append("restaurantFacebook", restaurant.facebook);
        formData.append("restaurantInstagram", restaurant.instagram);
        formData.append("restaurantTwitter", restaurant.twitter);

        const response = await actions.editRestaurant(formData);

        if (response)
            navigate(`/restaurant/${restaurantId}`)

    }

    const handleChange = (event) => {
        setRestaurant({ ...restaurant, [event.target.name]: event.target.value });
    }

    useEffect(() => {

        if (store.user == null || store.user.role == "User") {
            navigate("/access-denied")
        } else {
            const currentRestaurant = store.restaurant;
            setRestaurant({
                ...restaurant,
                name: currentRestaurant.name,
                phone: currentRestaurant.phone,
                location: currentRestaurant.location,
                description: currentRestaurant.description,
                facebook: currentRestaurant.facebook_url,
                instagram: currentRestaurant.instagram_url,
                twitter: currentRestaurant.twitter_url
            })
        }
    }, []);

    return (
        <>
            <Loader />
            <div className="container mt-3 profileEdit-main-container">
                <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-lx-5 p-4 bg-white profileEdit_form_container border border-1 rounded-3 mt-5">
                    <span className="text-center bg-danger p-2 text-white rounded-1 title fs-3 w-100">Editar perfil</span>
                    <form className="col-11 mt-2 editProfile_form" onSubmit={handleEdit}>
                        <div className="row mt-3">
                            <div className="col-md-7">
                                <label htmlFor="name" className="form-label m-1">Nombre del local</label>
                                <input type="text" className="form-control border" id="name" aria-describedby="emailHelp" name="name" value={restaurant.name} onChange={handleChange} />
                            </div>
                            {/* <div className="mb-3">
                        <label htmlFor="rif-input" className="form-label">RIF del Local</label>
                        <input type="text" className="form-control border" id="rif-input" aria-describedby="emailHelp" name="rif" value={restaurant.rif} onChange={handleChange}/>
                    </div> */}
                            <div className="col-md-5">
                                <label htmlFor="phone-number-input" className="form-label m-1">Teléfono de contacto</label>
                                <input type="text" className="form-control border" id="phone-number-input" aria-describedby="emailHelp" name="phone" value={restaurant.phone} onChange={handleChange} />
                            </div>
                        </div>

                        {/* <div className="mb-3">
                        <label htmlFor="email-input" className="form-label">Email</label>
                        <input type="email" className="form-control border" id="email-input" aria-describedby="emailHelp" name="email" value={restaurant.email} onChange={handleChange}/>
                    </div> */}
                        <div className="mt-3">
                            <label htmlFor="location-input" className="form-label m-1">Link de ubicación</label>
                            <input type="text" className="form-control border" id="location-input" aria-describedby="emailHelp" name="location" value={restaurant.location} onChange={handleChange} />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="description-input" className="form-label m-1">Descripción</label>
                            <textarea className="form-control" id="description-input" name="description" rows="3" value={restaurant.description} onChange={handleChange} />
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-4 ">
                                <label htmlFor="facebook-input" className="form-label m-1">Facebook</label>
                                <input type="text" className="form-control border" id="facebook-input" aria-describedby="emailHelp" name="facebook" value={restaurant.facebook} onChange={handleChange} />
                            </div>
                            <div className="col-md-4 ">
                                <label htmlFor="instagram-input" className="form-label m-1">Instagram</label>
                                <input type="text" className="form-control border" id="instagram-input" aria-describedby="emailHelp" name="instagram" value={restaurant.instagram} onChange={handleChange} />
                            </div>
                            <div className="col-md-4 ">
                                <label htmlFor="twitter-input" className="form-label m-1">Twitter</label>
                                <input type="text" className="form-control border" id="twitter-input" aria-describedby="emailHelp" name="twitter" value={restaurant.twitter} onChange={handleChange} />
                            </div>
                        </div>

                        <label htmlFor="password-input" className="form-label mt-3 m-1">Password</label>
                        <input type="password" className="form-control" id="password-input" name="password" value={restaurant.password} onChange={handleChange} placeholder="********" />

                        <div className="d-flex justify-content-between mt-3">
                            <button
                                type="submit"
                                className="button--green--edit-profile col-6 m-0"
                            >
                                Actualizar
                            </button>
                            <button
                                type="button"
                                className="button--red--edit-profile col-4 login_submit_button text-white"
                                onClick={() => navigate(`/restaurant/${restaurantId}`)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


export default EditProfile;