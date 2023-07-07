import React, { useState, useContext } from "react";
import { FaSearch } from 'react-icons/fa';
import { Context } from "../store/appContext";
import '../../styles/searchBar.css';

const initialValue = {
    budget: '',
    food: ''
}

export const SearchBar = () => {
    const {store, actions} = useContext(Context);
    const [search, setSearch] = useState(initialValue)

    const handleOnChange = ({ target }) => {
        setSearch({
            ...search,
            [target.name]: target.value
        })
        // query to api
        const { foodSearch } = actions;
        foodSearch({...search, tag:search.food});
    }

    return (
        <div className="container searchBar">
            <form className="p-5">
                <div className="form-group text-center mb-2">
                    <label htmlFor="budget" className="d-inline me-2 searchBar__label">
                        Hoy como con:
                    </label>
                    <input
                        type="text"
                        className="form-control d-inline w-25 border border-dark searchBar--border-bottom "
                        placeholder="$$$"
                        name="budget" /*budget = presupuesto*/
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
            </form>
        </div>
    );
};