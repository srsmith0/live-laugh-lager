import React from 'react';
import { Button } from 'semantic-ui-react';
import BrewerySearchForm from './BrewerySearchForm';

export default function FindBrewery(props) {
	return (
		<div>
			<BrewerySearchForm />
			<Button onClick={props.history.goBack}>Go Back</Button>
		</div>
	);
}
