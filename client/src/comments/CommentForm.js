import React from 'react';
import { Button } from 'semantic-ui-react';
import Axios from 'axios';
import { useFormInput } from '../customHooks/useFormInput';
import TextInput from '../components/TextInput';
import { Form } from '../components/Form';

export default function CommentForm(props) {
	const content = useFormInput('', 'comment');

	const comment = { content: content.value, post_id: props.post_id };

	function addComment(e) {
		Axios.post(`/api/users/${props.user_id}/posts/${props.post_id}/comments`, comment).then((res) => {
			let newComments = [ comment, ...props.comments ];
			props.setComments(newComments);
		});
	}

	return (
		<div>
			<Form header="Add Comment" onSubmit={addComment}>
				<TextInput useFormInput={content} textarea />
				<Button>Add Comment</Button>
			</Form>
		</div>
	);
}
