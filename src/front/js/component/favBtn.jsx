import React from "react";
import { Context } from "../store/appContext"
import { useState, useContext } from "react";
import { faHeart, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export const FavBtn = (id) => {
    const { store, actions } = useContext(Context)

    actions.addFavorite()

    return (
        <>
            <button onClick={handleClick}>
                <span className="fav-btn"><FontAwesomeIcon icon={faHeart} /></span>
            </button>
        </>
    )


}
