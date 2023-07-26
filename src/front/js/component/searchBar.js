import React, { useState, useContext } from "react";
import { FaSearch } from 'react-icons/fa';
import { Context } from "../store/appContext";
import '../../styles/searchBar.css';

const initialValue = {
    budget: '',
    food: '',
    tags: '',
}

export const SearchBar = () => {
    const { actions } = useContext(Context);
    const { foodSearch, clearResults } = actions;
    const [search, setSearch] = useState(initialValue)

    const handleOnChange = ({ target }) => {
        setSearch({
            ...search,
            [target.name]: target.value
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if(search.budget != '' || search.food != '')
            foodSearch(search);
        else
            clearResults();

    }

    return (
        <form className="container searchBar mt-5 p-4" onSubmit={submitHandler}>
            <div className="d-flex mx-3 border border-2 rounded-3">
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
                        name="budget"
                        id="budget"
                        onChange={handleOnChange}
                        value={search.budget} />
                    <span className="input-group-text border-0"><strong>$</strong></span>
                </div>
            </div>
            <div className="d-flex mt-4 mx-3">
                <button type="submit" className="button--find w-100">Buscar<FaSearch className="ms-1"/></button>
            </div>
        </form>
    );
};