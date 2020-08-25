import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CommentForm from './CommentForm';

export default function CommentList(props) {
	const [ comments, setComments ] = useState([]);

	useEffect(() => {
		setTimeout(() => {
			Axios.get(`/api/users/${props.user_id}/posts/${props.post_id}/comments`).then((res) => {
				setComments(res.data);
			});
		}, 100);
	}, []);

	function deleteComment(comment) {
		Axios.delete(`/api/users/${comment.user_id}/posts/${comment.post_id}/comments/${comment.id}`).then((res) => {
			const newComments = comments.filter((c) => c.id !== comment.id);
			setComments(newComments);
		});
	}

	return (
		<div>
			{comments.map((c) => (
				<div key={c.id}>
					{c.content}
					<button onClick={() => deleteComment(c)}>Delete</button>
					<hr />
				</div>
			))}
			<CommentForm
				user_id={props.user_id}
				post_id={props.post_id}
				comments={comments}
				setComments={setComments}
			/>
		</div>
	);
}
