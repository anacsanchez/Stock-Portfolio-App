import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UserForm = ({ handleSubmit, submitBtnText }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleFormSubmit = (evt) => {
		evt.preventDefault();
		handleSubmit({ email, password });
	};

	return (
		<div id="user-form">
			<form onSubmit={handleFormSubmit}>
				<div className="form-input-box">
					<label>Email:</label>
					<input
						aria-label="email-input"
						type="email"
						name="email"
						onChange={({ target }) => setEmail(target.value)}
						required
					/>
				</div>
				<div className="form-input-box">
					<label>Password:</label>
					<input
						aria-label="password-input"
						type="password"
						name="password"
						onChange={({ target }) => setPassword(target.value)}
						required
					/>
				</div>
				<button className="account-input-btn" type="submit">
					{submitBtnText}
				</button>
			</form>
		</div>
	);
};

UserForm.propTypes = {
	handleSubmit: PropTypes.func,
	submitBtnText: PropTypes.string
};

export default UserForm;
