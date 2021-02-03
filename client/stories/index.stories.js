import React from 'react';
import '../public/style.css';
import { Portfolio, Navbar, Landing } from '../app/components';
import { BrowserRouter } from 'react-router-dom';

export default {
	title: 'Stock Portfolio App',
	backgrounds: [
		{ name: 'light blue', value: '#00aced' }
	]
};

export const NavbarTop = (args) => (
	<BrowserRouter>
		<Navbar {...args}/>
	</BrowserRouter>
);
NavbarTop.args = {
	isLoggedIn: true
};

export const MainPage = (args) => (
	<BrowserRouter>
		<Navbar {...args} />
		<Portfolio />
	</BrowserRouter>
);
MainPage.args = { ...NavbarTop.args };

export const LandingScreen = (args) => (
	<BrowserRouter>
		<Navbar {...args} />
		<Landing />
	</BrowserRouter>
);
LandingScreen.args = { ...NavbarTop.args };
