import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Form } from '../components/Form';
import TextInput from '../components/TextInput';
import { Button } from 'semantic-ui-react';
import { useFormInput } from '../customHooks/useFormInput';
import { AuthConsumer } from '../providers/AuthProvider';
import Follower from './Follower';

function FollowForm(props) {
	const [ success, setSuccess ] = useState('');
	const [ userList, setUserList ] = useState([]);
	const username = useFormInput('', 'username');

	useEffect(() => {
		Axios.get(`/api/users`).then((res) => {
			setUserList(res.data);
		});
	}, []);
	// useEffect(() => {
	// 	Axios.get(`/api/not_followed/${props.auth.user.id}`).then((res) => {
	// 		setUserList(res.data);
	// 	});
	// }, []);

	// function renderNotFollowedUsers() {
	// 	return userList.map((u) => {
	// 		if (u.id !== props.auth.user.id) {
	// 			return (
	// 				<div key={u.id}>
	// 					<Follower follower={u} />
	// 				</div>
	// 			);
	// 		}
	// 	});
	// }

	function renderUsers() {
		return userList.map((u) => <Follower follower={u} />);
	}

	function followUser(userName) {
		Axios.get(`/api/user/${userName}`)
			.then((res) => {
				if (res.data.id === props.auth.user.id) {
					setSuccess('Cannot follow yourself');
					setTimeout(emptySuccess, 3000);
				} else {
					Axios.post(`/api/user/${res.data.id}/follow/${props.auth.user.id}`, {
						user_id: res.data.id,
						follower_id: props.auth.user.id
					}).then((res) => {
						{
							res.data.message
								? setSuccess(`${res.data.message}`)
								: setSuccess(`Now following ${userName}`);
						}
					});
				}
			})
			.catch((err) => {
				setSuccess('User does not exist');
				setTimeout(emptySuccess, 3000);
			});
	}

	async function handleSubmit() {
		followUser(username.value);
		setTimeout(emptySuccess, 3000);
	}

	function emptySuccess() {
		setSuccess('');
	}

	return (
		<div>
			<h2 className="smallHeader">Enter Username to Follow</h2>
			<div className="followForm">
				<Form onSubmit={handleSubmit}>
					<TextInput useFormInput={username} />
					<br />
					<Button color="green" style={{ marginTop: '10px' }}>
						Follow
					</Button>
				</Form>
				<p>{success}</p>
				{renderUsers()}
				{/* {renderNotFollowedUsers()} */}
			</div>
		</div>
	);
}

function ConnectedFollowForm(props) {
	return <AuthConsumer>{(auth) => <FollowForm {...props} auth={auth} />}</AuthConsumer>;
}

export default ConnectedFollowForm;
