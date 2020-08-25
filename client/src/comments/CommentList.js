import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CommentForm from './CommentForm';
import { Button } from 'semantic-ui-react';

export default function CommentList(props) {
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

	function deleteComment(comment) {
		Axios.delete(`/api/users/${comment.user_id}/posts/${comment.post_id}/comments/${comment.id}`).then((res) => {
			const newComments = comments.filter((c) => c.id !== comment.id);
			setComments(newComments);
		});
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
			{sortedComments.map((c) => (
				<div key={c.id}>
					{c.content}
					<button onClick={() => deleteComment(c)}>Delete</button>
					<hr />
				</div>
			))}
		</div>
	);
}
