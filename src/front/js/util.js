import { toast } from 'react-toastify';

export const successAlert = (text) => {
    toast.success(text, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}
export const warningAlert = (text) => {
    toast.warning(text, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}
export const errorAlert = (text) => {
    toast.error(text, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}


export const onValidateRegister = (user) => {
    let errors = {};
    let regexName = /^.{1,150}$/;                                               //LETTERS VALIDATION
    let regexPhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;            //PHONE VALIDATION
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;                     //EMAIL VALIDATION
    let regexRif = /^.{1,20}$/;                                                 //TEXT VALIDATION
    let regexLocation = /^https?:\/\/[A-Za-z0-9:.]*([\/]{1}.*\/?)$/;            //LOCATION VALIDATION
    let regexPassword = /^[^-\s]{8,20}$/;                                       //PASSWORD VALIDATION


    //VALIDACIONES PARA REGISTRO DE RESTAURANT

    if (!user.restaurantName.trim()) {
        errors.restaurantName = "This field should not be empty"
    } else if (!regexName.test(user.restaurantName)) {
        errors.restaurantName = "This field should not be more than 150 characters long"
    }


    if (!user.restaurantRif.trim()) {
        errors.restaurantRif = "This field should not be empty"
    } else if (!regexRif.test(user.restaurantRif)) {
        errors.restaurantRif = "This field should not be more than 20 characters long"
    }


    if (!user.phone.trim()) {
        errors.phone = "This field should not be empty"
    } else if (!regexPhone.test(user.phone)) {
        errors.phone = "This field only accepts numbers and '+' character"
    }


    if (!user.email.trim()) {
        errors.email = "This field should not be empty"
    } else if (!regexEmail.test(user.email)) {
        errors.email = "This field should have '@' and '.DOM' characters"
    }


    if (!user.location.trim()) {
        errors.location = "This field should not be empty"
    } else if (!regexLocation.test(user.location)) {
        errors.location = "This field should have a valid URL"
    }


    if (!user.password.trim()) {
        errors.password = "This field should not be empty"
    } else if (!regexPassword.test(user.password)) {
        errors.password = "This field should be between 8 and 20 characters"
    }



    return errors


}


export const onValidateDishes = (user) => {
    let errors = {};
    let regexName = /^.{1,20}$/;
    let regexComment = /^.{1,200}$/;                                               //LETTERS VALIDATION


    //VALIDACIONES PARA REGISTRO DE DISHES

    if (!user.name.trim()) {
        errors.name = "This field should not be empty"
    } else if (!regexName.test(user.name)) {
        errors.name = "This field should not be more than 20 characters long"
    }

    if (!user.description.trim()) {
        errors.description = "This field should not be empty"
    } else if (!regexComment.test(user.description)) {
        errors.description = "This field should not be more than 200 characters long"
    }

    if (!user.price.trim()) {
        errors.price = "This field should not be empty"
    }



    return errors

}