import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import beer from '../images/beer.jpg';
import { AuthConsumer } from '../providers/AuthProvider';

function Home(props) {
	return (
		<div style={background}>
			<h1 style={{ textAlign: 'center' }}>Welcome to Live, Laugh, Lager</h1>
			<h3 style={{ textAlign: 'center' }}>Your one stop for beer reviews, beer posts, and brewery locator</h3>
			{props.auth.user ? null : (
				<div style={button}>
					<Button as={Link} to="/register">
						Register
					</Button>
					<Button as={Link} to="/login">
						Login
					</Button>
				</div>
			)}
		</div>
	);
}

function ConnectedHome(props) {
	return <AuthConsumer>{(auth) => <Home {...props} auth={auth} />}</AuthConsumer>;
}

export default ConnectedHome;

const button = {
	display: 'flex',
	justifyContent: 'center',
	paddingTop: '20px'
};

const background = {
	// backgroundImage: `url(${beer})`,
	background: '#ffe999',
	width: '110em',
	height: '75em',
	backgroundSize: 'cover',
	margin: '0',
	backgroundRepeat: 'noRepeat'
};
