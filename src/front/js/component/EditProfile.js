import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import "../../styles/editProfile.css"


const initialValues = {
    name: "",
    rif: "",
    phone: "",
    email: "",
    location: "",
    description: "",
    password: "",
    facebook: "",
    instagram: "",
    twitter: ""
}


// here we must send a token
// here we must send the form's data

const EditProfile = () => {
    const { actions } = useContext(Context);
    const [restaurant, setRestaurant] = useState(initialValues);

    const handleEdit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("restaurantName", restaurant.name);
        formData.append("restaurantRif", restaurant.rif);
        formData.append("restaurantPhone", restaurant.phone);
        formData.append("userEmail", restaurant.email);
        formData.append("restaurantLocation", restaurant.location);
        formData.append("restaurantDescription", restaurant.description);
        formData.append("userPassword", restaurant.password);
        formData.append("restaurantFacebook", restaurant.facebook);
        formData.append("restaurantInstagram", restaurant.instagram);
        formData.append("restaurantTwitter", restaurant.twitter);

        actions.editRestaurant(restaurant);
    }
   
    const handleChange = (event) => {
        console.log(event.target.name)
        setRestaurant({...restaurant,[event.target.name]:event.target.value})        
    }

    return(
        <div className="container-fluid profileEdit-main-container">
            <div className="col-7 profileEdit_form_container border">
                <span className="col-12 bg-danger editProfile_title">Edit Profile Data</span>
                <form className="col-8 editProfile_form" onSubmit={handleEdit}>
                    <div className="mb-3">
                        <label htmlFor="business-name" className="form-label">Business Name</label>
                        <input type="text" className="form-control border" id="name" aria-describedby="emailHelp" name="name" value={restaurant.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rif-input" className="form-label">R.I.F</label>
                        <input type="text" className="form-control border" id="rif-input" aria-describedby="emailHelp" name="rif" value={restaurant.rif} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone-number-input" className="form-label">Phone Number</label>
                        <input type="text" className="form-control border" id="phone-number-input" aria-describedby="emailHelp" name="phone" value={restaurant.phone} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email-input" className="form-label">Email</label>
                        <input type="email" className="form-control border" id="email-input" aria-describedby="emailHelp" name="email" value={restaurant.email} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location-input" className="form-label">Location Link</label>
                        <input type="text" className="form-control border" id="location-input" aria-describedby="emailHelp" name="location" value={restaurant.location} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description-input" className="form-label">Description</label>
                        <textarea className="form-control" id="description-input" name="description" rows="3" value={restaurant.description} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="location-input" className="form-label">Facebook</label>
                        <input type="text" className="form-control border" id="facebook-input" aria-describedby="emailHelp" name="facebook" value={restaurant.facebook} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location-input" className="form-label">Instagram</label>
                        <input type="text" className="form-control border" id="instagram-input" aria-describedby="emailHelp" name="instagram" value={restaurant.instagram} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location-input" className="form-label">Twitter</label>
                        <input type="text" className="form-control border" id="twitter-input" aria-describedby="emailHelp" name="twitter" value={restaurant.twitter} onChange={handleChange}/>
                    </div>
                        <label htmlFor="password-input" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password-input" name="password" value={restaurant.password} onChange={handleChange}/>
                    </div>
                    <div className="mb-3 mt-3 d-flex justify-content-center">
                        <button type="submit" className="btn btn-success bg-success col-4 login_submit_button">Update</button>
                        <button type="submit" className="btn btn-danger bg-danger col-4 login_submit_button">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default EditProfile;