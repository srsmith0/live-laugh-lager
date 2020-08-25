import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button } from 'semantic-ui-react';
import { Form } from '../components/Form';
import TextInput from '../components/TextInput';
import { useFormInput } from '../customHooks/useFormInput';
import { AuthConsumer } from '../providers/AuthProvider';
import CommentList from '../comments/CommentList';

function ShowPost(props) {
	const [ post, setPost ] = useState({});
	const [ editing, setEditing ] = useState(false);

	const title = useFormInput(props.location.postProps.title, 'title');
	const content = useFormInput(props.location.postProps.content, 'content');

	useEffect(() => {
		Axios.get(`/api/users/${props.location.postProps.user_id}/posts/${props.location.postProps.id}`).then((res) => {
			setPost(res.data);
		});
	}, []);

	const handleEdit = (e) => {
		let post = { title: title.value, content: content.value };
		Axios.put(
			`/api/users/${props.location.postProps.user_id}/posts/${props.location.postProps.id}`,
			post
		).then((res) => {
			setPost(post);
			setEditing(!editing);
		});
	};

	const deletePost = (post) => {
		Axios.delete(`/api/users/${post.user_id}/posts/${post.id}`).then((res) => {
			props.history.push('/profile');
		});
	};

	return (
		<div>
			{editing ? (
				<Form header="Edit Post" onSubmit={handleEdit}>
					<TextInput label="Title" useFormInput={title} value={title} />
					<br />
					<TextInput label="Content" useFormInput={content} value={content} textarea />
					<Button style={{ marginTop: '10px' }}>Finish</Button>
				</Form>
			) : (
				<div>
					<h1>{post.title}</h1>
					<p>{post.content}</p>
				</div>
			)}
			{props.auth.user.id === post.user_id ? (
				<div>
					<Button onClick={() => deletePost(post)}>Delete</Button>
					<Button onClick={() => setEditing(!editing)}>Edit</Button>
				</div>
			) : null}
			<div>
				<CommentList post_id={props.location.postProps.id} user_id={props.location.postProps.user_id} />
			</div>
			<Button onClick={props.history.goBack}>Go Back</Button>
		</div>
	);
}

function ConnectedShowPost(props) {
	return <AuthConsumer>{(auth) => <ShowPost {...props} auth={auth} />}</AuthConsumer>;
}

export default ConnectedShowPost;
