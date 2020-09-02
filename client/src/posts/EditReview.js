import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import { Button, Rating } from 'semantic-ui-react';
import { Form } from '../components/Form';
import { useFormInput } from '../customHooks/useFormInput';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EditReview(props) {
	const { id } = useParams();
	const [ app, setApp ] = useState(props.review.appearance);
	const [ aroma, setAroma ] = useState(props.review.aroma);
	const [ flavor, setFlavor ] = useState(props.review.flavor);
	const [ mouthfeel, setMouthfeel ] = useState(props.review.mouthfeel);

	const name = useFormInput(props.review.name, 'name');
	const brewery = useFormInput(props.review.brewery, 'brewery');
	const style = useFormInput(props.review.style, 'style');
	const description = useFormInput(props.review.description, 'description');

	async function handleEdit() {
		const editedReview = {
			name: name.value,
			brewery: brewery.value,
			description: description.value,
			style: style.value,
			appearance: app,
			aroma,
			flavor,
			mouthfeel,
			overall: (app + aroma + flavor + mouthfeel) / 4
		};
		let res = await Axios.put(`/api/users/${props.userId}/reviews/${id}`, editedReview);
		props.setReview(res.data);
		props.setEditing(!props.editing);
	}

	function handleApp(e, app) {
		e.preventDefault();
		setApp(app.rating);
	}

	function handleAroma(e, aroma) {
		e.preventDefault();
		setAroma(aroma.rating);
	}

	function handleFlavor(e, flavor) {
		e.preventDefault();
		setFlavor(flavor.rating);
	}

	function handleMf(e, mF) {
		e.preventDefault();
		setMouthfeel(mF.rating);
	}

	return (
		<div>
			<Form header="Edit Review" onSubmit={handleEdit}>
				<TextInput label="Beer Name" useFormInput={name} value={name} />
				<br />
				<TextInput label="Brewery" useFormInput={brewery} value={brewery} />
				<TextInput label="Style" useFormInput={style} value={style} />
				<TextInput label="Description" useFormInput={description} value={description} textarea />
				Appearance:
				<Rating icon="heart" onRate={handleApp} rating={app} maxRating={5} size="tiny" />
				Aroma:
				<Rating icon="heart" onRate={handleAroma} rating={aroma} maxRating={5} size="tiny" />
				Flavor:
				<Rating icon="heart" onRate={handleFlavor} rating={flavor} maxRating={5} size="tiny" />
				Mouthfeel:
				<Rating icon="heart" onRate={handleMf} rating={mouthfeel} maxRating={5} size="tiny" />
				Overall:
				<Rating icon="heart" defaultRating={props.review.overall} maxRating={5} size="massive" disabled />
				<Button style={{ marginTop: '10px' }}>Finish</Button>
			</Form>
		</div>
	);
}
