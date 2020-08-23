import React, { useState } from 'react';
import { Form, Rating, Header, Segment, Button } from 'semantic-ui-react';
import Axios from 'axios';
import { AuthConsumer } from '../providers/AuthProvider';

const ReviewForm = (props) => {
	const [ name, setName ] = useState('');
	const [ brewery, setBrewery ] = useState('');
	const [ style, setStyle ] = useState('');
	const [ app, setApp ] = useState(null);
	const [ aroma, setAroma ] = useState(null);
	const [ flavor, setFlavor ] = useState(null);
	const [ mouthfeel, setMouthfeel ] = useState(null);
	const [ overall, setOverall ] = useState(null);

	const review = { name, brewery, style, appearance: app, aroma, flavor, mouthfeel, overall };

	async function handleSubmit(e) {
		e.preventDefault();
		calcOverall();
		debugger;
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

	function calcOverall() {
		const score = (app + aroma + flavor + mouthfeel) / 4;
		setOverall(score);
		debugger;
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Header as="h2" textAlign="center" style={{ marginTop: '15px' }}>
				Beer Review
			</Header>
			<Segment horizontal>
				<div style={styles.form}>
					<Form.Input
						label="Beer Name"
						name="name"
						required
						value={name}
						style={{ width: '25%' }}
						onChange={(e) => setName(e.target.value)}
					/>
					<Form.Input
						label="Brewery Name"
						name="brewery"
						required
						value={brewery}
						style={{ width: '25%' }}
						onChange={(e) => setBrewery(e.target.value)}
					/>
					<Form.Input
						label="Style"
						name="style"
						value={style}
						style={{ width: '25%' }}
						onChange={(e) => setStyle(e.target.value)}
					/>
				</div>
				<div style={styles.ranking}>
					<div>
						<Header as="h3">Appearance</Header>
						<Rating icon="heart" onRate={handleApp} rating={app} maxRating={5} />
					</div>
					<div>
						<Header as="h3">Aroma</Header>
						<Rating icon="heart" onRate={handleAroma} rating={aroma} maxRating={5} />
					</div>
					<div>
						<Header as="h3">Flavor</Header>
						<Rating icon="heart" onRate={handleFlavor} rating={flavor} maxRating={5} />
					</div>
					<div>
						<Header as="h3">Mouthfeel</Header>
						<Rating icon="heart" onRate={handleMf} rating={mouthfeel} maxRating={5} />
					</div>
				</div>
			</Segment>
			<Button onClick={props.history.goBack}>Go Back</Button>
			<Button>Submit</Button>
		</Form>
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
