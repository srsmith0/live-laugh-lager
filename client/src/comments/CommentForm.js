import React from 'react';
import { Button } from 'semantic-ui-react';
import Axios from 'axios';
import { useFormInput } from '../customHooks/useFormInput';
import TextInput from '../components/TextInput';
import { Form } from '../components/Form';

export default function CommentForm(props) {
	const content = useFormInput('', 'comment');

	const newComment = { content: content.value, post_id: props.post_id, user_name: props.user_name };

	function addComment(e) {
		Axios.post(`/api/users/${props.user_id}/posts/${props.post_id}/comments`, newComment).then((res) => {
			props.addComment(res.data);
			props.setCommentForm(!props.commentForm);
		});
	}

	return (
		<div>
			<Form onSubmit={addComment}>
				<TextInput required useFormInput={content} textarea />
				<Button color="green">Submit</Button>
			</Form>
		</div>
	);
}
