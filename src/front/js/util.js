
export const onValidate = (user) => {
    let isError = false;
    let errors = {};

    if (!user.restaurantName.trim()) {
        errors.restaurantName = "This field should not be empty"
        isError = true;
    };

    return isError ? errors : null;

}