import React from 'react';
import './HomeLogin.css';
import { AuthConsumer } from '../providers/AuthProvider';
import { Button, Form, Segment } from 'semantic-ui-react';

class Login extends React.Component {
	state = { email: '', password: '' };

	handleSubmit = (e) => {
		const { email, password } = this.state;
		this.props.closeModal(!this.props.modal);
		this.props.auth.handleLogin({ email, password }, this.props.history);
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		const { email, password } = this.state;

		return (
			<Segment basic>
				<h1 className="headerTitle">Live, Laugh, Lager</h1>
				<h3 className="headerSub">Login</h3>
				<Form onSubmit={this.handleSubmit}>
					<Form.Input
						label="Email"
						autoFocus
						required
						name="email"
						value={email}
						placeholder="Email"
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
					<Segment textAlign="center" basic>
						<Button primary type="submit" color="green">
							Submit
						</Button>
					</Segment>
				</Form>
			</Segment>
		);
	}
}

export default class ConnectedLogin extends React.Component {
	render() {
		return <AuthConsumer>{(auth) => <Login {...this.props} auth={auth} />}</AuthConsumer>;
	}
}
