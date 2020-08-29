import React from 'react';
import { useFormInput } from '../customHooks/useFormInput';
import { Button } from 'semantic-ui-react';
import { Form } from '../components/Form';
import TextInput from '../components/TextInput';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EditPost(props) {
	let { user_id, id } = useParams();

	const title = useFormInput(props.post.title, 'title');
	const content = useFormInput(props.post.content, 'content');

	const handleEdit = (e) => {
		let editedPost = { title: title.value, content: content.value };
		Axios.put(`/api/users/${user_id}/posts/${id}`, editedPost).then((res) => {
			props.setPost(res.data);
			props.setEditing(!props.editing);
		});
	};

	return (
		<Form header="Edit Post" onSubmit={handleEdit}>
			<TextInput label="Title" useFormInput={title} value={title} />
			<br />
			<TextInput label="Content" useFormInput={content} value={content} textarea />
			<Button style={{ marginTop: '10px' }}>Finish</Button>
		</Form>
	);
}
