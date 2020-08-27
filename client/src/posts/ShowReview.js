import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Rating, Button } from 'semantic-ui-react';
import EditReview from './EditReview';
import { useParams } from 'react-router-dom';
import { AuthConsumer } from '../providers/AuthProvider';

function ShowReview(props) {
	let { id } = useParams();
	const { user_id } = props.location.state;
	const [ review, setReview ] = useState(null);
	const [ editing, setEditing ] = useState(false);

	useEffect(() => {
		Axios.get(`/api/users/${user_id}/reviews/${id}`).then((res) => {
			setReview(res.data);
		});
	}, []);

	const deleteReview = () => {
		Axios.delete(`/api/users/${user_id}/reviews/${id}`)
			.then((res) => {
				props.history.push('/profile');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (review) {
		return (
			<div>
				{editing ? (
					<EditReview
						setEditing={setEditing}
						editing={editing}
						userId={user_id}
						setReview={setReview}
						review={review}
					/>
				) : (
					<div>
						<h1>{review.name}</h1>
						<h3>Brewery: {review.brewery}</h3>
						<h3>Style: {review.style}</h3>
						<p>Description: {review.description}</p>
						Appearance:
						<Rating icon="heart" defaultRating={review.appearance} maxRating={5} size="tiny" disabled />
						Aroma: <Rating icon="heart" defaultRating={review.aroma} maxRating={5} size="tiny" disabled />
						Flavor: <Rating icon="heart" defaultRating={review.flavor} maxRating={5} size="tiny" disabled />
						Mouthfeel:
						<Rating icon="heart" defaultRating={review.mouthfeel} maxRating={5} size="tiny" disabled />
						Overall:
						<Rating icon="heart" defaultRating={review.overall} maxRating={5} size="massive" disabled />
					</div>
				)}
				<br />
				{props.auth.user.id === review.user_id ? (
					<div>
						<Button onClick={() => setEditing(!editing)}>Edit</Button>
						<Button onClick={() => deleteReview()}>Delete</Button>
					</div>
				) : null}
				<Button onClick={props.history.goBack}>Go Back</Button>
			</div>
		);
	} else {
		return null;
	}
}

function ConnectedShowReview(props) {
	return <AuthConsumer>{(auth) => <ShowReview {...props} auth={auth} />}</AuthConsumer>;
}

export default ConnectedShowReview;
