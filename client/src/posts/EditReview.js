import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import { Button, Rating } from 'semantic-ui-react';
import { Form } from '../components/Form';
import { useFormInput } from '../customHooks/useFormInput';
import Axios from 'axios';

export default function EditReview(props) {
	const Review = props.review;
	const [ app, setApp ] = useState(Review.appearance);
	const [ aroma, setAroma ] = useState(Review.aroma);
	const [ flavor, setFlavor ] = useState(Review.flavor);
	const [ mouthfeel, setMouthfeel ] = useState(Review.mouthfeel);

	const name = useFormInput(Review.name, 'name');
	const brewery = useFormInput(Review.brewery, 'brewery');
	const style = useFormInput(Review.style, 'style');
	const description = useFormInput(Review.description, 'description');

	async function handleEdit() {
		const editedReview = {
			name: name.value,
			brewery: brewery.value,
			description: description.value,
			style: style.value,
			appearance: app.value,
			aroma: aroma.value,
			flavor: flavor.value,
			mouthfeel: mouthfeel.value
		};
		let res = await Axios.put(`/api/users/${Review.user_id}/reviews/${Review.id}`, editedReview);
		Review.name = res.data.name;
		Review.brewery = res.data.brewery;
		Review.description = res.data.description;
		Review.style = res.data.style;
		Review.appearance = res.data.appearance;
		Review.aroma = res.data.aroma;
		Review.flavor = res.data.flavor;
		Review.mouthfeel = res.data.mouthfeel;
		Review.overall = res.data.overall;
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
				<TextInput label="Brewery" useFormInput={brewery} value={brewery} textarea />
				<TextInput label="Style" useFormInput={style} value={style} textarea />
				<TextInput label="Description" useFormInput={description} value={description} textarea />
				Appearance:
				<Rating
					icon="heart"
					onRate={handleApp}
					rating={app}
					defaultRating={Review.appearance}
					maxRating={5}
					size="tiny"
				/>
				Aroma:
				<Rating
					icon="heart"
					onRate={handleAroma}
					rating={aroma}
					defaultRating={Review.aroma}
					maxRating={5}
					size="tiny"
				/>
				Flavor:
				<Rating
					icon="heart"
					onRate={handleFlavor}
					rating={flavor}
					defaultRating={Review.flavor}
					maxRating={5}
					size="tiny"
				/>
				Mouthfeel:
				<Rating
					icon="heart"
					onRate={handleMf}
					rating={mouthfeel}
					defaultRating={Review.mouthfeel}
					maxRating={5}
					size="tiny"
				/>
				Overall:
				<Rating icon="heart" defaultRating={Review.overall} maxRating={5} size="massive" disabled />
				<Button style={{ marginTop: '10px' }}>Finish</Button>
			</Form>
		</div>
	);
}
