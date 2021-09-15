import React from 'react';
import './HomeLogin.css';
import { AuthConsumer } from '../providers/AuthProvider';
import { Button, Form, Segment } from 'semantic-ui-react';

class Register extends React.Component {
	state = { email: '', password: '', passwordConfirmation: '', name: '', nickname: '' };

	handleSubmit = (e) => {
		const { email, password, name, nickname, passwordConfirmation } = this.state;
		const { auth: { handleRegister }, history } = this.props;

		if (password === passwordConfirmation) {
			this.props.closeModal(this.props.modal);
			handleRegister({ email, password, name, nickname }, history);
		} else alert('Passwords Do Not Match!');
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		const { email, password, passwordConfirmation, name, nickname } = this.state;

		return (
			<Segment basic>
				<h1 className="headerTitle">Live, Laugh, Lager</h1>
				<h3 className="headerSub"> Register</h3>
				<Form onSubmit={this.handleSubmit}>
					<Form.Input
						label="Name"
						autoFocus
						required
						type="name"
						name="name"
						value={name}
						placeholder="Full Name"
						onChange={this.handleChange}
					/>
					<Form.Input
						label="Email"
						required
						type="email"
						name="email"
						value={email}
						placeholder="Email"
						onChange={this.handleChange}
					/>
					<Form.Input
						label="Username"
						required
						type="nickname"
						name="nickname"
						value={nickname}
						placeholder="Username"
						onChange={this.handleChange}
					/>
					<Form.Input
						label="Password"
						required
						name="password"
						type="password"
						value={password}
						placeholder="Password"
						onChange={this.handleChange}
					/>
					<Form.Input
						label="Password Confirmation"
						required
						name="passwordConfirmation"
						type="password"
						value={passwordConfirmation}
						placeholder="Password Confirmation"
						onChange={this.handleChange}
					/>
					<Segment textAlign="center" basic>
						<Button color="green" primary type="submit">
							Submit
						</Button>
					</Segment>
				</Form>
			</Segment>
		);
	}
}

export default class ConnectedRegister extends React.Component {
	render() {
		return <AuthConsumer>{(auth) => <Register {...this.props} auth={auth} />}</AuthConsumer>;
	}
}
