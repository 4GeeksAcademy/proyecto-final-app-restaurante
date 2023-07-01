import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';

export const SearchBar = () => {





    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>Hoy como con:</h2>
                </div>
                <div className="input-group col">
                    <input type="text" className="form-control" placeholder="Buscar por tipo de comida o restaurante..." aria-label="Buscar" aria-describedby="button-addon2" />
                </div>
            </div>

            <div className="input-group">
                <input type="text" className="form-control" placeholder="Buscar por tipo de comida o restaurante..." aria-label="Buscar" aria-describedby="button-addon2" />
                <button className="btn btn-primary" type="button" id="button-addon2"><FaSearch /></button>
            </div>
        </div>
    );
};