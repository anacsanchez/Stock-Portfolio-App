import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { LOGIN_USER } from '../graphql';
import UserForm from './UserForm';

const Login = () => {
	const client = useApolloClient();

	const [ login, { loading, error } ] = useMutation(LOGIN_USER, {
		onCompleted({ login: { token } }) {
			if (token?.length) {
				localStorage.setItem("token", token);
				client.writeData({ data: { isLoggedIn: true } });
			}
		},
		onError(err) { return err; }
	});

	const handleLoginSubmit = (userInput) => login({ variables: { user: { ...userInput } } });

	if (loading) return <div>Loading...</div>;

	return (
		<div className="section">
			<h2 className="section-title">Login</h2>
			{ error &&
				<div>Error: {error.graphQLErrors[0]?.message}</div>
			}
			<UserForm submitBtnText="Login" handleSubmit={handleLoginSubmit} />
		</div>
	);
};

export default Login;
