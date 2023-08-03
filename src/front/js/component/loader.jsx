import React, { useEffect } from 'react';
import "../../styles/loader.css";

export const Loader = () => {

    useEffect(() => {
        const loader = document.querySelector(".loader");

        loader.classList.add("loader-hidden");

        loader.addEventListener("transitionend", () => {
            document.body.removeChild("loader");
        })

    }, [])

    return (
        <div className='loader'></div>
    )

}

