import React from "react";
import "../../styles/editProfile.css"

const EditProfile = () => {
    return(
        // <div className="container-fluid profile_edition_main_container">
        //     <div className="login_form_container col-6">
        //         <div className="col-12 bg-danger login_title">Login</div>
        //         <form className="col-10 login_form" onSubmit={handleLogin}>
        //             <div className="mb-3">
        //                 <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
        //                 <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={user.email} onChange={(event) => handleUser(event)} />
        //             </div>
        //             <div className="mb-3">
        //                 <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        //                 <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={user.password} onChange={(event) => handleUser(event)} />
        //             </div>
        //             <button type="submit" className="btn btn-success col-4 login_submit_button">Submit</button>
        //         </form>
        //     </div>
        // </div>

        <div className="container-fluid profileEdit-main-container">
            <div className="col-7 profileEdit_form_container border">
                <span className="col-12 bg-danger editProfile_title">Edit Profile Data</span>
                <form className="col-8 editProfile_form" /*onSubmit={handleEdit}*/>
                    <div className="mb-3">
                        <label htmlFor="business-name" className="form-label">Business Name</label>
                        <input type="text" className="form-control border" id="business-name" aria-describedby="emailHelp" name="business-name" /* value={user.email} onChange={(event) => handleUser(event)} *//>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rif-input" className="form-label">R.I.F</label>
                        <input type="text" className="form-control border" id="rif-input" aria-describedby="emailHelp" name="email" /* value={user.email} onChange={(event) => handleUser(event)} *//>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone-number-input" className="form-label">Phone Number</label>
                        <input type="text" className="form-control border" id="phone-number-input" aria-describedby="emailHelp" name="email" /* value={user.email} onChange={(event) => handleUser(event)} *//>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email-input" className="form-label">Email</label>
                        <input type="email" className="form-control border" id="email-input" aria-describedby="emailHelp" name="email" /* value={user.email} onChange={(event) => handleUser(event)} *//>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location-input" className="form-label">Location Link</label>
                        <input type="text" className="form-control border" id="location-input" aria-describedby="emailHelp" name="email" /* value={user.email} onChange={(event) => handleUser(event)} *//>
                    </div>
                    <div className="mb-3">
                        <label for="description-input" className="form-label">Description</label>
                        <textarea className="form-control" id="description-input" rows="3"></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password-input" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password-input" name="password" /* value={user.password} onChange={(event) => handleUser(event)} *//>
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