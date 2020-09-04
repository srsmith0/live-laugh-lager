import React, { useState } from 'react';
import { Form } from '../components/Form';
import TextInput from '../components/TextInput';
import { Button } from 'semantic-ui-react';
import { breweryKey } from '../keys';
import { useFormInput } from '../customHooks/useFormInput';
import Axios from 'axios';
import BreweryCard from './BreweryCard';
import './findBrewery.css';

export default function FindBrewery() {
	const [ data, setData ] = useState(null);
	const [ loading, setLoading ] = useState(false);

	const breweryState = useFormInput('', 'full name of state');

	function renderBreweries(breweries) {
		if (loading) {
			return (
				<div className="lds-heart">
					<div />
				</div>
			);
		} else
			return (
				<div>
					{breweries.map((d) => {
						return <BreweryCard brewery={d} />;
					})}
				</div>
			);
	}

	const handleSubmit = (e) => {
		setLoading(true);
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
				}
				setLoading(false);
			})
			.catch((err) => {
				alert('Search failed. Please try again');
				console.log(err);
			});
	};

	return (
		<div>
			<div className="discover">
				<h2 className="discoverHeader">Discover Breweries</h2>
				<Form onSubmit={handleSubmit}>
					<TextInput label="State" useFormInput={breweryState} />
					<br />
					<Button color="green" size="small" style={{ marginTop: '10px' }}>
						Submit
					</Button>
				</Form>
			</div>
			<div className="breweryCards">{data !== null ? renderBreweries(data) : null}</div>
		</div>
	);
}
