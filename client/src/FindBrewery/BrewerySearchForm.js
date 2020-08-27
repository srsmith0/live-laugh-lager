import React, { useState } from 'react';
import { Form } from '../components/Form';
import TextInput from '../components/TextInput';
import { Button } from 'semantic-ui-react';
import { breweryKey } from '../keys';
import { useFormInput } from '../customHooks/useFormInput';
import Axios from 'axios';
import BreweryCard from './BreweryCard';

export default function BrewerySearchForm() {
	const [ data, setData ] = useState(null);

	const breweryState = useFormInput('', 'state');

	function renderBreweries(breweries) {
		return (
			<div>
				{breweries.map((d) => {
					return <BreweryCard brewery={d} />;
				})}
			</div>
		);
	}

	const handleSubmit = (e) => {
		const brewerySearch =
			breweryState.value.toLowerCase().charAt(0).toUpperCase() + breweryState.value.toLowerCase().slice(1);
		Axios.get(`https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries?by_state=${brewerySearch}`, {
			headers: {
				'x-rapidapi-host': 'brianiswu-open-brewery-db-v1.p.rapidapi.com',
				'x-rapidapi-key': breweryKey
			}
		})
			.then((res) => {
				{
					res.data <= 0 ? alert('No results found') : setData(res.data);
					console.log(res.data);
				}
			})
			.catch((err) => {
				alert('Search failed. Please try again');
				console.log(err);
			});
	};

	return (
		<div>
			<Form header="Discover Breweries" onSubmit={handleSubmit}>
				<TextInput label="State" useFormInput={breweryState} />
				<br />
				<Button style={{ marginTop: '10px' }}>Submit</Button>
			</Form>
			{data !== null ? renderBreweries(data) : null}
		</div>
	);
}
