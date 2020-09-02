import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { Button } from 'semantic-ui-react';
import { AuthConsumer } from '../providers/AuthProvider';

function CommentList(props) {
	const [ comments, setComments ] = useState([]);
	const [ commentForm, setCommentForm ] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			Axios.get(`/api/users/${props.userId}/posts/${props.postId}/comments`).then((res) => {
				setComments(res.data);
			});
		}, 100);
	}, []);

	function addComment(comment) {
		setComments([ comment, ...comments ]);
	}

	const editComment = (comment) => {
		Axios.put(`/api/users/${props.userId}/posts/${props.postId}/comments/${comment.id}`, comment).then((res) => {
			const updateComment = comments.map((c) => {
				if (c.id === comment.id) return res.data;
				return c;
			});
			setComments(updateComment);
		});
	};

	function deleteComment(comment) {
		Axios.delete(`/api/users/${comment.userId}/posts/${comment.postId}/comments/${comment.id}`).then((res) => {
			const newComments = comments.filter((c) => c.id !== comment.id);
			setComments(newComments);
		});
	}

	function renderComments() {
		return sortedComments.map((c) => (
			<Comment
				editComment={editComment}
				deleteComment={deleteComment}
				userId={props.userId}
				addComment={addComment}
				comment={c}
			/>
		));
	}

	function compare(a, b) {
		const createA = a.created_at;
		const createB = b.created_at;

		let comparison = 0;
		if (createA > createB) {
			comparison = -1;
		} else if (createA < createB) {
			comparison = 1;
		}
		return comparison;
	}

	let sortedComments = comments.sort(compare);

	return (
		<div>
			<Button onClick={() => setCommentForm(!commentForm)}>Add Comment</Button>
			{commentForm ? (
				<CommentForm
					user_id={props.userId}
					post_id={props.postId}
					comments={comments}
					commentForm={commentForm}
					setCommentForm={setCommentForm}
					addComment={addComment}
				/>
			) : null}
			{renderComments()}
		</div>
	);
}

function ConnectedCommentList(props) {
	return <AuthConsumer>{(auth) => <CommentList {...props} auth={auth} />}</AuthConsumer>;
}

export default ConnectedCommentList;
