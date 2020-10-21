import React, { useState } from 'react';
import { Form, Rating, Header, Button } from 'semantic-ui-react';
import Axios from 'axios';
import { AuthConsumer } from '../providers/AuthProvider';

const ReviewForm = (props) => {
	const [ name, setName ] = useState('');
	const [ brewery, setBrewery ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ style, setStyle ] = useState('');
	const [ app, setApp ] = useState(null);
	const [ aroma, setAroma ] = useState(null);
	const [ flavor, setFlavor ] = useState(null);
	const [ mouthfeel, setMouthfeel ] = useState(null);

	const review = {
		name,
		brewery,
		description,
		style,
		appearance: app,
		aroma,
		flavor,
		mouthfeel,
		user_name: props.auth.user.nickname
	};

	async function handleSubmit(e) {
		e.preventDefault();
		let res = await Axios.post(`/api/users/${props.auth.user.id}/reviews`, review);
		props.history.push('/profile');
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
			<h2 className="reviewHeader">Beer Review</h2>
			<Form onSubmit={handleSubmit}>
				<div className="reviewForm">
					<div className="reviewInputs">
						<Form.Input
							label="Beer Name"
							name="name"
							required
							value={name}
							style={{ width: '70%' }}
							onChange={(e) => setName(e.target.value)}
						/>
						<Form.Input
							label="Brewery Name"
							name="brewery"
							required
							value={brewery}
							style={{ width: '70%' }}
							onChange={(e) => setBrewery(e.target.value)}
						/>
						<Form.Input
							label="Style"
							name="style"
							required
							value={style}
							style={{ width: '70%' }}
							onChange={(e) => setStyle(e.target.value)}
						/>
						<div className="reviewScores">
							<div className="reviewScoresAA">
								<div>
									<Header as="h4">Appearance</Header>
									<Rating icon="heart" size="large" onRate={handleApp} rating={app} maxRating={5} />
								</div>
								<div>
									<Header as="h4">Aroma</Header>
									<Rating
										icon="heart"
										size="large"
										onRate={handleAroma}
										rating={aroma}
										maxRating={5}
									/>
								</div>
							</div>
							<div className="reviewScoresFM">
								<div>
									<Header as="h4">Flavor</Header>
									<Rating
										icon="heart"
										size="large"
										onRate={handleFlavor}
										rating={flavor}
										maxRating={5}
									/>
								</div>
								<div>
									<Header as="h4">Mouthfeel</Header>
									<Rating
										icon="heart"
										size="large"
										onRate={handleMf}
										rating={mouthfeel}
										maxRating={5}
									/>
								</div>
							</div>
						</div>
						<div className="beerDescription">
							<Form.TextArea
								label="Description"
								name="description"
								style={{ width: '80%' }}
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className="reviewButtons">
					<Button color="green">Submit</Button>
				</div>
			</Form>
			<div className="reviewButtons" style={{ paddingBottom: '2rem' }}>
				<Button color="blue" onClick={props.history.goBack}>
					Go Back
				</Button>
			</div>
		</div>
	);
};

function ConnectedReviewForm(props) {
	return <AuthConsumer>{(auth) => <ReviewForm {...props} auth={auth} />}</AuthConsumer>;
}

export default ConnectedReviewForm;

const styles = {
	form: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr'
	},
	ranking: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
		gridTemplateGap: '200px'
	}
};
