import React, { useState } from 'react';
import Axios from 'axios';
import { Rating, Button } from 'semantic-ui-react';
import EditReview from './EditReview';

export default function ShowReview(props) {
	const { Review } = props.location.state;
	const [ editing, setEditing ] = useState(false);

	const deleteReview = () => {
		Axios.delete(`/api/users/${Review.user_id}/reviews/${Review.id}`)
			.then((res) => {
				props.history.push('/profile');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			{editing ? (
				<EditReview setEditing={setEditing} editing={editing} review={Review} />
			) : (
				<div>
					<h1>{Review.name}</h1>
					<h3>Brewery: {Review.brewery}</h3>
					<h3>Style: {Review.style}</h3>
					<p>Description: {Review.description}</p>
					Appearance:
					<Rating icon="heart" defaultRating={Review.appearance} maxRating={5} size="tiny" disabled />
					Aroma: <Rating icon="heart" defaultRating={Review.aroma} maxRating={5} size="tiny" disabled />
					Flavor: <Rating icon="heart" defaultRating={Review.flavor} maxRating={5} size="tiny" disabled />
					Mouthfeel:
					<Rating icon="heart" defaultRating={Review.mouthfeel} maxRating={5} size="tiny" disabled />
					Overall:
					<Rating icon="heart" defaultRating={Review.overall} maxRating={5} size="massive" disabled />
				</div>
			)}
			<br />

			<Button onClick={() => setEditing(!editing)}>Edit</Button>
			<Button onClick={() => deleteReview()}>Delete</Button>
			<Button onClick={props.history.goBack}>Go Back</Button>
		</div>
	);
}
