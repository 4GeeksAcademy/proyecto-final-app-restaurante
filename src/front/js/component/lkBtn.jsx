import React from "react";
import { faHeart, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export const LkBtn = (id) => {
    const handleClick = () => {
        alert(id)
    }

    return (
        <>
            <button onClick={handleClick}>
                <span className="like-btn"><FontAwesomeIcon icon={faThumbsUp} /></span>
            </button>
            <button onClick={handleClick}>
                <span className="dlike-btn"><FontAwesomeIcon icon={faThumbsDown} /></span>
            </button>
        </>
    )


}
