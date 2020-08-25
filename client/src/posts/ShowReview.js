import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Rating, Button } from 'semantic-ui-react';

export default function ShowReview(props) {
	const [ review, setReview ] = useState({});
	const [ appearance, setAppearance ] = useState(props.location.reviewProps.appearance);
	const [ aroma, setAroma ] = useState(props.location.reviewProps.aroma);
	const [ flavor, setFlavor ] = useState(props.location.reviewProps.flavor);
	const [ mouthfeel, setMouthfeel ] = useState(props.location.reviewProps.mouthfeel);
	const [ overall, setOverall ] = useState(props.location.reviewProps.overall);

	useEffect(() => {
		Axios.get(
			`/api/users/${props.location.reviewProps.user_id}/reviews/${props.location.reviewProps.id}`
		).then((res) => {
			setReview(res.data);
		});
	}, []);

	function deleteReview() {
		Axios.delete(`/api/users/${review.user_id}/reviews/${review.id}`)
			.then((res) => {
				props.history.push('/profile');
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div>
			<h1>{review.name}</h1>
			<h3>Brewery: {review.brewery}</h3>
			<h3>Style: {review.style}</h3>
			<p>Description: {review.description}</p>
			Appearance: <Rating icon="heart" defaultRating={appearance} maxRating={5} disabled />
			Aroma: <Rating icon="heart" defaultRating={aroma} maxRating={5} disabled />
			Flavor: <Rating icon="heart" defaultRating={flavor} maxRating={5} disabled />
			Mouthfeel: <Rating icon="heart" defaultRating={mouthfeel} maxRating={5} disabled />
			Overall: <Rating icon="heart" defaultRating={overall} maxRating={5} disabled />
			<Button onClick={() => deleteReview()}>Delete</Button>
			<Button onClick={props.history.goBack}>Go Back</Button>
		</div>
	);
}
