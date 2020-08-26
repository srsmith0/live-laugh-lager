import React, { useState } from 'react';
import Axios from 'axios';
import { Button } from 'semantic-ui-react';
import { Form } from '../components/Form';
import TextInput from '../components/TextInput';
import { useFormInput } from '../customHooks/useFormInput';
import { AuthConsumer } from '../providers/AuthProvider';
import CommentList from '../comments/CommentList';

function ShowPost(props) {
	const [ editing, setEditing ] = useState(false);
	const { Post } = props.location.state;

	const title = useFormInput(Post.title, 'title');
	const content = useFormInput(Post.content, 'content');

	const handleEdit = (e) => {
		let post = { title: title.value, content: content.value };
		Axios.put(`/api/users/${Post.user_id}/posts/${Post.id}`, post).then((res) => {
			Post.title = post.title;
			Post.content = post.content;
			setEditing(!editing);
		});
	};

	const deletePost = () => {
		Axios.delete(`/api/users/${Post.user_id}/posts/${Post.id}`).then((res) => {
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
					<h1>{Post.title}</h1>
					<p>{Post.content}</p>
				</div>
			)}
			{props.auth.user.id === Post.user_id ? (
				<div>
					<Button onClick={() => deletePost()}>Delete</Button>
					<Button onClick={() => setEditing(!editing)}>Edit</Button>
				</div>
			) : null}
			<div>
				<CommentList post_id={Post.id} user_id={Post.user_id} />
			</div>
			<Button onClick={props.history.goBack}>Go Back</Button>
		</div>
	);
}

function ConnectedShowPost(props) {
	return <AuthConsumer>{(auth) => <ShowPost {...props} auth={auth} />}</AuthConsumer>;
}

export default ConnectedShowPost;
