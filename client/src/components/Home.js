import React, { useState } from 'react';
import './HomeLogin.css';
import { Button, Modal } from 'semantic-ui-react';
import { AuthConsumer } from '../providers/AuthProvider';
import Register from './Register';
import Login from './Login';

function Home(props) {
	const [openRegister, setOpenRegister] = useState(false);
	const [openLogin, setOpenLogin] = useState(false);

	return (
		<div className="background">
			<h1 className="title">Live, Laugh, Lager</h1>
			<div className="content">
				<div className="text">
					<h3 className="banner">
						Gather with friends to share beer reviews, posts, and find your favorite breweries
					</h3>
					{props.auth.user ? null : (
						<div className="button">
							<Modal
								closeIcon
								open={openRegister}
								trigger={
									<Button size="huge" color="yellow">
										Register
									</Button>
								}
								onClose={() => setOpenRegister(false)}
								onOpen={() => setOpenRegister(true)}
							>
								<Modal.Content>
									<Register {...props} modal={openRegister} closeModal={setOpenRegister} />
								</Modal.Content>
							</Modal>
							<Modal
								closeIcon
								open={openLogin}
								trigger={
									<Button size="huge" color="olive">
										Login
									</Button>
								}
								onClose={() => setOpenLogin(false)}
								onOpen={() => setOpenLogin(true)}
							>
								<Modal.Content>
									<Login {...props} modal={openLogin} closeModal={setOpenLogin} />
								</Modal.Content>
							</Modal>
							<Button
								onClick={() => props.auth.handleLogin(process.env.REACT_APP_DEMO_EMAIL, process.env.REACT_APP_DEMO_PASSWORD)}
								size="huge"
								color="yellow"
							>
								Demo
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function ConnectedHome(props) {
	return <AuthConsumer>{(auth) => <Home {...props} auth={auth} />}</AuthConsumer>;
}

export default ConnectedHome;
