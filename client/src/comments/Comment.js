import React, { useState } from 'react';
import EditComment from './EditComment';
import Axios from 'axios';
import { AuthConsumer } from '../providers/AuthProvider';

function Comment(props) {
	const [ editing, setEditing ] = useState(false);

	return (
		<div key={props.comment.id}>
			<p>{props.comment.content}</p>
			{editing ? (
				<EditComment
					editComment={props.editComment}
					comment={props.comment}
					postId={props.postId}
					setEditing={setEditing}
					editing={editing}
				/>
			) : null}

			{props.auth.user.id === props.comment.user_id ? (
				<div>
					<button onClick={() => setEditing(!editing)}>Edit</button>
					<button onClick={() => props.deleteComment(props.comment)}>Delete</button>
				</div>
			) : null}
			<hr />
		</div>
	);
}

function ConnectedComment(props) {
	return <AuthConsumer>{(auth) => <Comment {...props} auth={auth} />}</AuthConsumer>;
}

export default ConnectedComment;
