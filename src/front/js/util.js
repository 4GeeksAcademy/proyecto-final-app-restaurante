import { toast } from 'react-toastify';

export const successAlert = (text) => {
    toast.success(text, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}
export const warningAlert = (text) => {
    toast.warning(text, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}
export const errorAlert = (text) => {
    toast.error(text, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
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
        errors.restaurantName = "Este campo no debe estar vacío"
    } else if (!regexName.test(user.restaurantName)) {
        errors.restaurantName = "Este campo no debe tener mas de 150 caracteres"
    }


    if (!user.restaurantRif.trim()) {
        errors.restaurantRif = "Este campo no debe estar vacío"
    } else if (!regexRif.test(user.restaurantRif)) {
        errors.restaurantRif = "Este campo no debe ser mayor a 20 caracteres"
    }


    if (!user.phone.trim()) {
        errors.phone = "Este campo no debe estar vacío"
    } else if (!regexPhone.test(user.phone)) {
        errors.phone = "Este campo acepta solo números y el caracter '+'"
    }


    if (!user.email.trim()) {
        errors.email = "Este campo no debe estar vacío"
    } else if (!regexEmail.test(user.email)) {
        errors.email = "Este campo debe llevar los caracteres '@' y '.DOM'"
    }


    if (!user.location.trim()) {
        errors.location = "Este campo no debe estar vacío"
    } else if (!regexLocation.test(user.location)) {
        errors.location = "Este campo debe tener una URL válida"
    }


    if (!user.password.trim()) {
        errors.password = "Este campo no debe estar vacío"
    } else if (!regexPassword.test(user.password)) {
        errors.password = "Este campo debe llevar entre 8 y 20 caracteres"
    }



    return errors


}


export const onValidateDishes = (user) => {
    let errors = {};
    let regexName = /^.{1,20}$/;
    let regexComment = /^.{1,100}$/;
    let regexNumber = /^([0-9])*$/;

    //VALIDACIONES PARA REGISTRO DE DISHES

    if (!user.name.trim()) {
        errors.name = "Este campo no debe estar vacío"
    } else if (!regexName.test(user.name)) {
        errors.name = "Este campo no debe llevar mas de 20 caracteres"
    }

    if (!user.description.trim()) {
        errors.description = "Este campo no debe estar vacío"
    } else if (!regexComment.test(user.description)) {
        errors.description = "Este campo no debe ser mayor a 100 caracteres"
    }

    if (!user.price.trim()) {
        errors.price = "Este campo no debe estar vacío"
    } else if (!regexNumber.test(user.price)) {
        errors.price = "Este campo debe llevar solo numeros"
    }



    return errors

}


export const onValidateUserName = (user) => {
    let errors = {};
    let regexUserName = /^.{1,20}$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexPassword = /^[^-\s]{8,20}$/;


    if (!user.username.trim()) {
        errors.username = "Este campo no debe estar vacío"
    } else if (!regexUserName.test(user.username)) {
        errors.username = "Este campo no debe tener mas de 20 caracteres"
    }

    if (!user.email.trim()) {
        errors.email = "Este campo no debe estar vacío"
    } else if (!regexEmail.test(user.email)) {
        errors.email = "Este campo debe llevar los caracteres '@' y '.DOM'"
    }

    if (!user.password.trim()) {
        errors.password = "Este campo no debe estar vacío"
    } else if (!regexPassword.test(user.password)) {
        errors.password = "Este campo debe llevar entre 8 y 20 caracteres"
    }



    return errors
}