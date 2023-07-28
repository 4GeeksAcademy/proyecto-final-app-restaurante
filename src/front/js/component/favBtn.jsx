import React from "react";
import { faHeart, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export const FavBtn = (id) => {
    const handleClick = () => {
        alert(id)
    }

    return (
        <>
            <button onClick={handleClick}>
                <span className="fav-btn"><FontAwesomeIcon icon={faHeart} /></span>
            </button>
        </>
    )


}
