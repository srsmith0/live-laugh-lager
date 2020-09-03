import React from 'react';
import { Form } from '../components/Form';
import TextInput from '../components/TextInput';
import { useFormInput } from '../customHooks/useFormInput';
import { Button } from 'semantic-ui-react';
import Axios from 'axios';
import { AuthConsumer } from '../providers/AuthProvider';

function PostForm(props) {
	const title = useFormInput('', 'title');
	const content = useFormInput('', 'content');

	const post = { title: title.value, content: content.value, user_name: props.auth.user.nickname };

	const handleSubmit = (e) => {
		Axios.post(`/api/users/${props.auth.user.id}/posts`, post)
			.then((res) => {
				props.history.push('/profile');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<h1 className="postHeader">Add a Post</h1>
			<Form onSubmit={handleSubmit}>
				<div className="postForm">
					<div className="postInputs">
						<TextInput label="Title" required={true} useFormInput={title} />
						<br />
						<TextInput label="Content" useFormInput={content} required={true} textarea required />
					</div>
				</div>
				<div className="postButtons">
					<Button color="green">Submit</Button>
				</div>
			</Form>
			<div className="postButtons">
				<Button color="blue" onClick={props.history.goBack}>
					Go Back
				</Button>
			</div>
		</div>
	);
}

function ConnectedPostForm(props) {
	return <AuthConsumer>{(auth) => <PostForm {...props} auth={auth} />}</AuthConsumer>;
}

export default ConnectedPostForm;
