import React, { useState } from 'react';
import './HomeLogin.css';
import { Button, Modal } from 'semantic-ui-react';
import home from '../images/home.jpg';
import { AuthConsumer } from '../providers/AuthProvider';
import Register from './Register';
import Login from './Login';
import Footer from './Footer';

function Home(props) {
	const [ openRegister, setOpenRegister ] = useState(false);
	const [ openLogin, setOpenLogin ] = useState(false);

	return (
		<div className="background">
			<h1 className="title">Live, Laugh, Lager</h1>
			<div className="content">
				<div className="text">
					<h3 className="banner">
						Gather with friends to share beer reviews, posts, and find your favorite breweries.
					</h3>
					{props.auth.user ? null : (
						<div className="button">
							<Modal
								closeIcon
								open={openRegister}
								trigger={
									<Button color="teal" modal={openRegister} closeModal={setOpenRegister}>
										Register
									</Button>
								}
								onClose={() => setOpenRegister(false)}
								onOpen={() => setOpenRegister(true)}
							>
								<Modal.Content>
									<Register />
								</Modal.Content>
							</Modal>
							<Modal
								closeIcon
								open={openLogin}
								trigger={<Button color="teal">Login</Button>}
								onClose={() => setOpenLogin(false)}
								onOpen={() => setOpenLogin(true)}
							>
								<Modal.Content>
									<Login modal={openLogin} closeModal={setOpenLogin} />
								</Modal.Content>
							</Modal>
						</div>
					)}
				</div>
				<img className="homeImage" width="70%" height="70%" src={home} />
			</div>
			<Footer />
		</div>
	);
}

function ConnectedHome(props) {
	return <AuthConsumer>{(auth) => <Home {...props} auth={auth} />}</AuthConsumer>;
}

export default ConnectedHome;
