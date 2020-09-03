import React from 'react';
import { Form } from '../components/Form';
import TextInput from '../components/TextInput';
import { Button } from 'semantic-ui-react';
import { useFormInput } from '../customHooks/useFormInput';

export default function EditComment(props) {
	const content = useFormInput(props.comment.content, 'comment');

	//not getting an id passed
	function handleEdit(e) {
		let comment = props.comment;
		comment.content = content.value;
		const editedComment = comment;
		props.editComment(editedComment);
		props.setEditing(!props.editing);
	}

	return (
		<Form onSubmit={handleEdit}>
			<TextInput label="Edit Comment" useFormInput={content} value={content} textarea />
			<Button color="green" style={{ marginTop: '10px' }}>
				Finish
			</Button>
		</Form>
	);
}
