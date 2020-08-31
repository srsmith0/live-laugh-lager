import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button } from 'semantic-ui-react';
import { AuthConsumer } from '../providers/AuthProvider';
import CommentList from '../comments/CommentList';
import { useParams } from 'react-router-dom';
import EditPost from './EditPost';

function ShowPost(props) {
	const [ editing, setEditing ] = useState(false);
	const [ post, setPost ] = useState(null);
	const { id } = useParams();
	const { user_id } = props.location.state;

	useEffect(() => {
		Axios.get(`/api/users/${user_id}/posts/${id}`).then((res) => {
			setPost(res.data);
		});
	}, []);

	const deletePost = () => {
		Axios.delete(`/api/users/${user_id}/posts/${id}`).then((res) => {
			props.history.push('/profile');
		});
	};

	if (post) {
		return (
			<div>
				{editing ? (
					<EditPost editing={editing} post={post} setPost={setPost} setEditing={setEditing} />
				) : (
					<div>
						<h1>{post.title}</h1>
						<p>By: {post.user_name}</p>
						<p>{post.content}</p>
					</div>
				)}
				{props.auth.user.id === post.user_id ? (
					<div>
						<Button onClick={() => deletePost()}>Delete</Button>
						<Button onClick={() => setEditing(!editing)}>Edit</Button>
					</div>
				) : null}
				<div>
					<CommentList post_id={id} user_id={user_id} />
				</div>
				<Button onClick={props.history.goBack}>Go Back</Button>
			</div>
		);
	} else {
		return null;
	}
}

function ConnectedShowPost(props) {
	return <AuthConsumer>{(auth) => <ShowPost {...props} auth={auth} />}</AuthConsumer>;
}

export default ConnectedShowPost;
