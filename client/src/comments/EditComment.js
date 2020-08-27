import React from 'react';
import { Form } from '../components/Form';
import TextInput from '../components/TextInput';
import { Button } from 'semantic-ui-react';
import { useFormInput } from '../customHooks/useFormInput';

export default function EditComment(props) {
	const content = useFormInput(props.comment.content, 'comment');

	//not getting an id passed
	function handleEdit(e) {
		const editedComment = { content: content.value };
		props.editComment(editedComment);
		props.setEditing(!props.editing);
	}

	return (
		<Form header="Edit Comment" onSubmit={handleEdit}>
			<TextInput label="Comment" useFormInput={content} value={content} textarea />
			<Button style={{ marginTop: '10px' }}>Finish</Button>
		</Form>
	);
}
