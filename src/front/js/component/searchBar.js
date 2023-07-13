import React, { useState, useEffect, useContext } from "react";
import { FaSearch } from 'react-icons/fa';
import { Context } from "../store/appContext";
import '../../styles/searchBar.css';

const initialValue = {
    budget: '',
    food: ''
}

export const SearchBar = () => {
    const { store, actions } = useContext(Context);
    const { foodSearch } = actions;
    const [search, setSearch] = useState(initialValue)

    const handleOnChange = ({ target }) => {
        setSearch({
            ...search,
            [target.name]: target.value
        })
    }

    useEffect(() => {
        if (search.budget != '' || search.food != '') {
            foodSearch(search);
        }
    }, [search])

    return (
        <div className="container searchBar mt-5 w-20 bg-white p-4 rounded-3">
            <div className="d-flex mx-3 border border-1 rounded-3">
                <div className="input-group">
                    <span className="input-group-text border-0" id="budget"><strong>Hoy como</strong></span>
                    <input type="text"
                        className="form-control border border-dark"
                        placeholder="...lo que te provoca"
                        aria-label="Buscar"
                        aria-describedby="button-addon"
                        id="food"
                        name="food"
                        onChange={handleOnChange}
                        value={search.food} />
                </div>
                <div className="input-group">
                    <span className="input-group-text border-0 rounded-0"><strong>con</strong></span>
                    <input type="text"
                        className="form-control d-inline w-25 "
                        placeholder="...el monto"
                        name="budget" /*budget = presupuesto*/
                        id="budget"
                        onChange={handleOnChange}
                        value={search.budget} />
                    <span className="input-group-text border-0"><strong>$</strong></span>
                </div>
            </div>
            <div className="d-flex mt-4 mx-3">
            <button type="button" className="btn btn-success w-100">Buscar <FaSearch /></button>
            </div>


            {/* <form className="p-5">
                <div className="form-group text-center mb-2">
                    <label htmlFor="budget" className="d-inline me-2 searchBar__label">
                        Hoy como con:
                    </label>
                    <input
                        type="text"
                        className="form-control d-inline w-25 border border-dark searchBar--border-bottom "
                        placeholder="$$$"
                        name="budget"
                        id="budget"
                        onChange={handleOnChange}
                        value={search.budget}
                    />
                    <h4 className="d-inline ms-2">$</h4>
                </div>
                
                <div className="input-group text-center searchBar--border-bottom ">
                    <input
                        type="text"
                        className="form-control border border-dark"
                        placeholder="Buscar por tipo de comida o restaurante..."
                        aria-label="Buscar"
                        aria-describedby="button-addon"
                        id="food"
                        name="food"
                        onChange={handleOnChange}
                        value={search.food}
                    />
                    <button className="searchBar__submit btn btn-primary" type="submit" id="button-addon2"><FaSearch /></button>
                </div>
            </form> */}
        </div>
    );
};