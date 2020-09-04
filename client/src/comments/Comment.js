import React, { useState } from 'react';
import EditComment from './EditComment';
import { AuthConsumer } from '../providers/AuthProvider';
import { Button, Icon } from 'semantic-ui-react';

function Comment(props) {
	const [ editing, setEditing ] = useState(false);

	return (
		<div key={props.comment.id}>
			<p>{props.comment.user_name} says:</p>
			<p>{props.comment.content}</p>
			{editing ? <EditComment {...props} setEditing={setEditing} editing={editing} /> : null}

			{props.auth.user.id === props.comment.user_id ? (
				<div>
					<Button icon="edit" size="mini" color="orange" onClick={() => setEditing(!editing)} />
					<Button
						icon="trash alternate"
						size="mini"
						color="red"
						onClick={() => props.deleteComment(props.comment)}
					/>
				</div>
			) : null}
			<hr className="hr1" />
		</div>
	);
}

function ConnectedComment(props) {
	return <AuthConsumer>{(auth) => <Comment {...props} auth={auth} />}</AuthConsumer>;
}

export default ConnectedComment;
