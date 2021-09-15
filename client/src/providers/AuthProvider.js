import React from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export default class AuthProvider extends React.Component {
	state = { user: null };

	handleRegister = (user, history) => {
		debugger;
		axios
			.post('/api/auth', user)
			.then((res) => {
				this.setState({ user: res.data.data });
				history.push('/profile');
			})
			.catch((err) => {
				console.log(err);
				alert('Registration Failed');
			});
	};

	handleLogin = (user, history) => {
		debugger;
		axios
			.post('/api/auth/sign_in', user)
			.then((res) => {
				this.setState({ user: res.data.data });
				history.push('/profile');
			})
			.catch((err) => {
				console.log(err);
				alert('Login Failed');
			});
	};

	handleLogout = (history) => {
		axios
			.delete('/api/auth/sign_out')
			.then((res) => {
				history.push('/');
				this.setState({ user: null });
			})
			.catch((err) => {
				console.log(err);
				alert('Logout Failed');
			});
	};

	handleEdit = (user) => {
		axios.put(`/api/users/${user.id}`, user).then((res) => this.setState({ user: user }));
	};

	render() {
		return (
			<AuthContext.Provider
				value={{
					...this.state,
					authenticated: this.state.user !== null,
					handleRegister: this.handleRegister,
					handleLogin: this.handleLogin,
					handleLogout: this.handleLogout,
					handleEdit: this.handleEdit,
					setUser: (user) => this.setState({ user })
				}}
			>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}
