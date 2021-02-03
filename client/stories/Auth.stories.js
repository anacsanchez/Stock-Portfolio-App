import React from 'react';
import { UserForm, Login, Signup } from '../app/components';

export default {
	title: 'Login & Signup',
};

export const LoginSignupForm = (args) => <UserForm {...args} />;

LoginSignupForm.args = {
	submitBtnText: "Submit"
};

export const LoginScreen = () => <Login />;

export const SignupScreen = () => <Signup />;

