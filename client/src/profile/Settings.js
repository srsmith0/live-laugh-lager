import React, { useState } from 'react';
import { AuthConsumer } from '../providers/AuthProvider';
import Axios from 'axios';
import { Button } from 'semantic-ui-react';

function Settings(props) {
	const [ firstName, setFirstName ] = useState(props.auth.user.name);
	const [ email, setEmail ] = useState(props.auth.user.email);
	const [ username, setUsername ] = useState(props.auth.user.nickname);
	const [ editing, setEditing ] = useState(false);
	const [ disabled, setDisabled ] = useState(true);
	// const [ password, setPassword ] = useState(false);
	// const [ currentPassword, setCurrentPassword ] = useState('');
	// const [ newPassword, setNewPassword ] = useState('');
	// const [ copyPassword, setCopyPassword ] = useState('');

	const user = {
		name: firstName,
		nickname: username,
		email: email,
		id: props.auth.user.id
		// newPassword: newPassword,
		// copyPassword: copyPassword
	};

	function handleSubmit(e) {
		e.preventDefault();
		props.auth.handleEdit(user);
		setEditing(!editing);
		setDisabled(!disabled);
	}

	function removeUser() {
		props.auth.handleLogout(props.history);
		Axios.delete(`/api/users/${user.id}`);
	}

	// function changePassword(e) {
	// 	debugger;
	// 	if (currentPassword === props.auth.user.password && newPassword === copyPassword) {
	// 		Axios.put(`/api/auth/password`, { password: newPassword });
	// 		setEditing(!editing);
	// 	} else if (newPassword !== copyPassword) {
	// 		alert('Passwords do not match');
	// 	} else {
	// 		alert('Invalid password');
	// 	}
	// }

	return (
		<div className="settings">
			<h1 className="settingsHeader" style={{ textAlign: 'center' }}>
				Account Settings
			</h1>
			<div className="settingsButton">
				<Button icon="edit" color="violet" onClick={() => (setEditing(!editing), setDisabled(!disabled))} />
			</div>
			<form onSubmit={handleSubmit}>
				<p>
					Name:
					<input
						label="First Name"
						value={firstName}
						onChange={editing ? (e) => setFirstName(e.target.value) : null}
						disabled={disabled}
					/>
				</p>
				<p>
					Username:
					<input
						label="Username"
						value={username}
						onChange={editing ? (e) => setUsername(e.target.value) : null}
						disabled={disabled}
					/>
				</p>
				<p>
					Email:
					<input
						label="Email"
						value={email}
						onChange={editing ? (e) => setEmail(e.target.value) : null}
						disabled={disabled}
					/>
				</p>
				{editing ? (
					<Button color="green" size="small">
						Submit
					</Button>
				) : null}
			</form>
			<br />
			{/* {editing ? <button onClick={() => setPassword(!password)}>Change Password</button> : null}
			<form onSubmit={changePassword}>
				{password && editing ? (
					<div>
						<Form onSubmit={changePassword}>
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
									type="password"
									value={newPassword}
									onChange={editing ? (e) => setNewPassword(e.target.value) : null}
								/>
							</p>
							<p>
								Retype Password:
								<input
									label="Retype Password"
									type="password"
									value={copyPassword}
									onChange={editing ? (e) => setCopyPassword(e.target.value) : null}
								/>
							</p>
							<Button color="green" size="tiny">
								Submit
							</Button>
						</Form>
					</div>
				) : null}
			</form> */}
			<Button color="red" onClick={() => removeUser()}>
				Delete Account
			</Button>
			<br />
		</div>
	);
}

function ConnectedSettings(props) {
	return <AuthConsumer>{(auth) => <Settings {...props} auth={auth} />}</AuthConsumer>;
}

export default ConnectedSettings;
