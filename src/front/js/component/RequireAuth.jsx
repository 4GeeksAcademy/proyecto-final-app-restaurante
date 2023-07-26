import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext.js';

const RequireAuth = ({child}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    const { store } =  useContext(Context);
    const { token } = store;

    useEffect( () => {
        if(token==null) {
            navigate('/login');
        }
        else {
            setAuthenticated(true);
        }
    });

    return(
        authenticated
        ? <>{child}</>
        : <div>loading....</div>
    );
}

export default RequireAuth;