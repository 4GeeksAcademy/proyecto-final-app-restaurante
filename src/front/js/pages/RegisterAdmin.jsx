import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/registerAdmin.css';

const initialValues = {
  avatar: null,
  username: null,
  password: null
}

const RegisterAdmin = () => {
  const { token } = useParams();
  const [user, setUser] = useState(initialValues);

  return (
    <div className='container register-admin panel rounded-3 border border-1 p-3 mt-4'>
      <form className="register-admin__form">
        <h2 className='register-admin__h2'>Regístrate como admin</h2>
        <div className="form-group mt-4 px-4">
          <label htmlFor="avatar" className="form-label">
            Avatar
          </label>
          <input
            className="form-control form-control-sm border border-dark"
            id="avatar"
            name="avatar"
            type="file"
            onChange={({ target }) => setUser({ ...user, avatar: target.files[0] })}
            required
          />
        </div>
        <div className="form-group mt-4 px-4">
          <label htmlFor="name">username</label>
          <input
            type="text"
            className="form-control border"
            id="name"
            name="name"
            placeholder="Ingresa su username"
            required
          />
        </div>
        <div className="form-group mt-4 px-4">
          <label htmlFor="password">Contraseña</label>
          <input
            type="text"
            className="form-control border"
            id="password"
            name="password"
            placeholder="Ingresa su contraseña"
            required
          />
        </div>

        <button 
          type='submit' 
          className='mt-4 btn btn-success bg-success register-admin__button'>
            Registrar
        </button>
      </form>
    </div>
  );
};
export default RegisterAdmin;