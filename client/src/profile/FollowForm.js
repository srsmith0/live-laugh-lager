import React, { useState } from 'react';
import Axios from 'axios';
import { Form } from '../components/Form';
import TextInput from '../components/TextInput';
import { Button } from 'semantic-ui-react';
import { useFormInput } from '../customHooks/useFormInput';

export default function FollowForm({ user }) {
	const username = useFormInput('', 'username');

	function followUser(userName) {
		Axios.get(`/api/user/${userName}`)
			.then((res) => {
				Axios.post(`/api/user/${res.data.id}/follow/${user.id}`, {
					user_id: res.data.id,
					follower_id: user.id
				}).then((res) => {
					console.log(res.data);
				});
			})
			.catch((err) => {
				alert('Could not follow');
			});
	}

	//need to figure out how to clear form

	async function handleSubmit() {
		followUser(username.value);
	}
	return (
		<div>
			<Form header="Enter Username to Follow" onSubmit={handleSubmit}>
				<TextInput useFormInput={username} />
				<br />
				<Button style={{ marginTop: '10px' }}>Follow</Button>
			</Form>
		</div>
	);
}
