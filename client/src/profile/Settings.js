import React, { useState } from 'react';
import { AuthConsumer } from '../providers/AuthProvider';
import Axios from 'axios';
import FollowForm from './FollowForm';

function Settings(props) {
	const [ firstName, setFirstName ] = useState(props.auth.user.name);
	const [ email, setEmail ] = useState(props.auth.user.email);
	const [ username, setUsername ] = useState(props.auth.user.nickname);
	const [ editing, setEditing ] = useState(false);
	const [ password, setPassword ] = useState(false);
	const [ currentPassword, setCurrentPassword ] = useState('');
	const [ newPassword, setNewPassword ] = useState('');
	const [ copyPassword, setCopyPassword ] = useState('');

	const user = {
		name: firstName,
		nickname: username,
		email: email,
		id: props.auth.user.id,
		newPassword: newPassword,
		copyPassword: copyPassword
	};

	function handleSubmit(e) {
		e.preventDefault();
		props.auth.handleEdit(user);
		setEditing(!editing);
	}

	function removeUser() {
		props.auth.handleLogout(props.history);
		Axios.delete(`/api/users/${user.id}`);
	}

	function changePassword(e) {
		e.preventDefault();
		console.log(e);
		if (currentPassword === props.auth.user.password && newPassword === copyPassword) {
			console.log(e);
			Axios.put(`/api/auth/password`, newPassword);
			setEditing(!editing);
		}
	}

	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Account Settings</h1>
			<form onSubmit={handleSubmit}>
				<p>
					Name:
					<input
						label="First Name"
						value={firstName}
						onChange={editing ? (e) => setFirstName(e.target.value) : null}
					/>
				</p>
				<p>
					Username:
					<input
						label="Username"
						value={username}
						onChange={editing ? (e) => setUsername(e.target.value) : null}
					/>
				</p>
				<p>
					Email:
					<input label="Email" value={email} onChange={editing ? (e) => setEmail(e.target.value) : null} />
				</p>
				{editing ? <button>Submit</button> : null}
			</form>
			<br />
			<button onClick={() => setEditing(!editing)}>Edit</button>
			{editing ? <button onClick={() => setPassword(!password)}>Change Password</button> : null}
			<form onSubmit={changePassword}>
				{password && editing ? (
					<div>
						<p>
							Current Password:
							<input
								label="Current Password"
								type="password"
								value={currentPassword}
								onChange={editing ? (e) => setCurrentPassword(e.target.value) : null}
							/>
						</p>
						<p>
							New Password:
							<input
								label="New Password"
								value={newPassword}
								onChange={editing ? (e) => setNewPassword(e.target.value) : null}
							/>
						</p>
						<p>
							Retype Password:
							<input
								label="Retype Password"
								value={copyPassword}
								onChange={editing ? (e) => setCopyPassword(e.target.value) : null}
							/>
						</p>
						<button>Submit</button>
					</div>
				) : null}
			</form>
			<button style={{ color: 'red' }} onClick={() => removeUser()}>
				Delete Account
			</button>
			<br />
			<FollowForm user={props.auth.user} />
		</div>
	);
}

function ConnectedSettings(props) {
	return <AuthConsumer>{(auth) => <Settings {...props} auth={auth} />}</AuthConsumer>;
}

export default ConnectedSettings;
