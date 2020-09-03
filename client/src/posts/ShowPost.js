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
	const [ showComments, setShowComments ] = useState(false);
	const { id } = useParams();
	const { userId } = props.location.state;

	useEffect(() => {
		Axios.get(`/api/users/${userId}/posts/${id}`).then((res) => {
			setPost(res.data);
		});
	}, []);

	const deletePost = () => {
		Axios.delete(`/api/users/${userId}/posts/${id}`).then((res) => {
			props.history.push('/profile');
		});
	};

	if (post) {
		return (
			<div>
				<h1 className="reviewHeader">{post.title}</h1>
				<h4 className="bannerProfile" style={{ textAlign: 'center' }}>
					By: {post.user_name}
				</h4>
				<div className="postShow">
					{editing ? (
						<EditPost editing={editing} post={post} setPost={setPost} setEditing={setEditing} />
					) : (
						<div className="postContent">
							<p>{post.content}</p>
						</div>
					)}
				</div>
				<div className="comments">
					<Button onClick={() => setShowComments(!showComments)} color="black">
						{showComments ? 'Hide Comments' : 'Show Comments'}
					</Button>
					<br />
					<br />
					{showComments ? <CommentList postId={id} userId={userId} /> : null}
				</div>
				<div className="postButtons">
					{props.auth.user.id === post.user_id ? (
						<div>
							<Button color="orange" onClick={() => setEditing(!editing)}>
								Edit
							</Button>
							<Button color="red" onClick={() => deletePost()}>
								Delete
							</Button>
						</div>
					) : null}
					<Button color="blue" onClick={props.history.goBack}>
						Go Back
					</Button>
				</div>
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
