import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/editProfile.css"

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

    useEffect( ()=> {
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
    }, []);

    const handleEdit = (e) => {
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

        actions.editRestaurant(formData);
    }

    const handleChange = (event) => {
        setRestaurant({ ...restaurant, [event.target.name]: event.target.value });
    }

    return (
        <div className="container mt-4 profileEdit-main-container">
            <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-lx-5 bg-white profileEdit_form_container border">
                <span className="w-100 bg-danger editProfile_title">Editar perfil de datos</span>
                <form className="col-8 editProfile_form" onSubmit={handleEdit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre del local</label>
                        <input type="text" className="form-control border" id="name" aria-describedby="emailHelp" name="name" value={restaurant.name} onChange={handleChange} />
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="rif-input" className="form-label">RIF del Local</label>
                        <input type="text" className="form-control border" id="rif-input" aria-describedby="emailHelp" name="rif" value={restaurant.rif} onChange={handleChange}/>
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="phone-number-input" className="form-label">Teléfono de contacto</label>
                        <input type="text" className="form-control border" id="phone-number-input" aria-describedby="emailHelp" name="phone" value={restaurant.phone} onChange={handleChange} />
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="email-input" className="form-label">Email</label>
                        <input type="email" className="form-control border" id="email-input" aria-describedby="emailHelp" name="email" value={restaurant.email} onChange={handleChange}/>
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="location-input" className="form-label">Link de ubicación</label>
                        <input type="text" className="form-control border" id="location-input" aria-describedby="emailHelp" name="location" value={restaurant.location} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description-input" className="form-label">Descripción</label>
                        <textarea className="form-control" id="description-input" name="description" rows="3" value={restaurant.description} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="facebook-input" className="form-label">Facebook</label>
                        <input type="text" className="form-control border" id="facebook-input" aria-describedby="emailHelp" name="facebook" value={restaurant.facebook} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="instagram-input" className="form-label">Instagram</label>
                        <input type="text" className="form-control border" id="instagram-input" aria-describedby="emailHelp" name="instagram" value={restaurant.instagram} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="twitter-input" className="form-label">Twitter</label>
                        <input type="text" className="form-control border" id="twitter-input" aria-describedby="emailHelp" name="twitter" value={restaurant.twitter} onChange={handleChange} />
                    </div>
                    <label htmlFor="password-input" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password-input" name="password" value={restaurant.password} onChange={handleChange} />

                    <div className="mb-3 mt-3 d-flex justify-content-center">
                        <button type="submit" className="btn btn-success bg-success col-4 login_submit_button">Actualizar</button>
                        <button type="button" className="btn btn-danger bg-danger col-4 login_submit_button">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default EditProfile;