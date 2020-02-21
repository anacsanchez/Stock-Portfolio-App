import React, { useState } from 'react';

const UserForm = ({ handleSubmit }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    handleSubmit({ email, password });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Email:</label><input type="email" name="email" onChange={({target}) => setEmail(target.value)} required />
        <label>Password:</label><input type="password" name="password" onChange={({target}) => setPassword(target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
