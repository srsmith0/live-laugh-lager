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
			Axios.get(`/api/users/${props.user_id}/posts/${props.post_id}/comments`).then((res) => {
				setComments(res.data);
			});
		}, 100);
	}, []);

	function addComment(comment) {
		setComments([ comment, ...comments ]);
	}

	const editComment = (comment) => {
		Axios.put(`/api/users/${props.userId}/posts/${props.post_id}/comments/${comment.id}`, comment).then((res) => {
			const updateComment = comments.map((c) => {
				if (c.id === comment.id) return res.data;
				return c;
			});
			setComments(updateComment);
		});
	};

	function deleteComment(comment) {
		Axios.delete(`/api/users/${comment.user_id}/posts/${comment.post_id}/comments/${comment.id}`).then((res) => {
			const newComments = comments.filter((c) => c.id !== comment.id);
			setComments(newComments);
		});
	}

	function renderComments() {
		return sortedComments.map((c) => (
			<Comment
				editComment={editComment}
				deleteComment={deleteComment}
				userId={props.user_id}
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
					user_id={props.user_id}
					post_id={props.post_id}
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
