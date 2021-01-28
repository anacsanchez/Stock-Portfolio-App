import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import UserForm from './UserForm';
import { SIGNUP_USER } from '../graphql';

const Signup = () => {
	const client = useApolloClient();

	const [ signup, { error } ] = useMutation(SIGNUP_USER, {
		onCompleted({ signup: { token } }) {
			if (token?.length) {
				localStorage.setItem("token", token);
				client.writeData({ data: { isLoggedIn: true } });
			}
		}, onError(err) { console.error(err); }
	});

	const handleSignupSubmit = (userInput) => signup({ variables: { user: { ...userInput } } });

	return (
		<div className="section">
			<h2 className="section-title">Signup</h2>
			{ error ?
				<div>Error: { error.graphQLErrors[0]?.message }</div>
				: ''
			}
			<UserForm submitBtnText="Signup" handleSubmit={handleSignupSubmit} />
		</div>
	);
};

export default Signup;
