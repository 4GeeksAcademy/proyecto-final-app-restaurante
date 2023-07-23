import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import { onValidateDishes } from "../util.js";


const initialState = {
    name: "",
    description: "",
    price: "",
    tags: "",
    image: "",
};

export const EditDish = () => {
    const { actions, store } = useContext(Context);
    const [dish, setDish] = useState(initialState);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { dishId } = useParams();


    useEffect(() => {
        let arrayDish = store.restaurant.foods;

        arrayDish = arrayDish.filter(dish => dish.id == dishId);
        const currentDish = arrayDish[0]
        
        setDish({
            ...dish,
            name: currentDish.name,
            description: currentDish.description,
            price: currentDish.price,
            tags: currentDish.tags,
            image: currentDish.image,
        })
        
    }, []);
    
    const handleChange = (e) => {
        setDish({ ...dish, [e.target.name]: e.target.value });
    };

    const handleEdit = (e) => {                                 
        e.preventDefault()
        const err = onValidateDishes(dish)                  
        setErrors(err)                                             

        if (Object.keys(err).length === 0) {                

            const formData = new FormData();                      

            formData.append("foodName", dish.name);
            formData.append("foodDescription", dish.description);
            formData.append("foodPrice", dish.price);
            formData.append("foodTags", dish.tags);
            formData.append("image", dish.image);

            const success = actions.editDish(formData);

            if(success)
                navigate('/restaurant/menu');
        };
    }


    return (
        <>
            <div className="container panel mt-4 p-4 bg-white border border-1 rounded-3">
                <div className="row justify-content-center">
                    <h2 className="text-center bg-danger p-2 text-white rounded-1 title">
                        <strong>Editar Plato</strong>
                    </h2>
                    <div className="mt-3 col-12 col-sm-9 col-md-7 col-lg-6 col-lx-5 login_container">
                        <form
                            className="needs-validation"
                            noValidate
                            onSubmit={handleEdit}
                        >
                            <div className="form-group mt-4">
                                <label htmlFor="name">Nombre:</label>
                                <input
                                    type="text"
                                    className="form-control border border-dark"
                                    id="name"
                                    name="name"
                                    placeholder="Ingresa el nombre del plato"
                                    onChange={handleChange}
                                    value={dish.name}
                                    required
                                ></input>
                                {errors.name && <div className="alert p-0 m-0 bg-none text-danger">{errors.name}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label
                                    htmlFor="description"
                                >
                                    Descripción
                                </label>
                                <textarea
                                    className="form-control border border-dark"
                                    id="description"
                                    name="description"
                                    rows="3"
                                    placeholder="Una breve descripción de tu plato"
                                    onChange={handleChange}
                                    value={dish.description}
                                    required
                                ></textarea>
                                {errors.description && <div className="alert p-0 m-0 bg-none text-danger">{errors.description}</div>}

                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="name">Precio</label>
                                <div className="input-group border rounded-3">
                                    <input
                                        type="number"
                                        className="form-control border border-dark"
                                        id="price"
                                        name="price"
                                        aria-label="Amount (to the nearest dollar)"
                                        placeholder="Monto en dólares"
                                        onChange={handleChange}
                                        value={dish.price}
                                        required
                                    />
                                    <span className="input-group-text">$</span>
                                </div>
                                {errors.price && <div className="alert p-0 m-0 bg-none text-danger">{errors.price}</div>}

                            </div>

                            <div className="form-group mt-4">
                                <label htmlFor="name">Etiquetas</label>
                                <input
                                    type="text"
                                    className="form-control border border-dark"
                                    id="tags"
                                    name="tags"
                                    placeholder="Agrega algunas palabras claves"
                                    onChange={handleChange}
                                    value={dish.tags}
                                    required
                                ></input>
                                {errors.tags && <div className="alert p-0 m-0 bg-none text-danger">{errors.tags}</div>}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="image" className="form-label">
                                    Imagen
                                </label>
                                <input
                                    className="form-control form-control-sm border border-dark"
                                    id="image"
                                    name="image"
                                    type="file"
                                    onChange={({ target }) => setDish({ ...dish, image: target.files[0] })}
                                    required
                                ></input>
                                {/* {errors.image && <div className="alert p-0 m-0 bg-none text-danger">{errors.image}</div>} */}
                            </div>

                            <div className="d-flex  mt-3 justify-content-between">
                                <button
                                    type="button"
                                    className="btn btn-success w-100 me-2"
                                    onClick={(e) => handleEdit(e)}
                                >
                                    <strong>Actualizar</strong>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger bg-danger col-4 login_submit_button"
                                    onClick={() => navigate("/restaurant/menu")}>
                                    <strong>Cancelar</strong>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}