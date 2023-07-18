import React from 'react';
import { useParams } from 'react-router-dom';

const RegisterAdmin = () => {
  const { token } = useParams();

  return (
    <div>
      username
      avatar_url
      password
    </div>
  );
};
export default RegisterAdmin;