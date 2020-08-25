import React, { useEffect } from 'react';
import Axios from 'axios';
import { Button } from 'semantic-ui-react';
import { breweryKey } from '../keys';

export default function FindBrewery(props) {
	useEffect(() => {
		Axios.get('https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries?by_state=Utah', {
			headers: {
				'x-rapidapi-host': 'brianiswu-open-brewery-db-v1.p.rapidapi.com',
				'x-rapidapi-key': breweryKey
			}
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			You made it to find brewery!
			<Button onClick={props.history.goBack}>Go Back</Button>
		</div>
	);
}
