import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

export default function BreweryCard({ brewery }) {
	return (
		<Card key={brewery.id}>
			<Card.Content>
				<Card.Header>{brewery.name}</Card.Header>
				<Card.Meta>
					<span>{brewery.street}</span>
				</Card.Meta>
				<Card.Description>
					{brewery.city}, {brewery.state} {brewery.postal_code.slice([ 0 ], 5)}
				</Card.Description>
			</Card.Content>
			<Card.Content>
				<Icon name="phone" /> <Icon name="world" />
				<div>
					{brewery.phone.slice(0, 3)}-{brewery.phone.slice(3, 6)}-{brewery.phone.slice(6, 10)}
					<br />
					<a href={brewery.website_url}>{brewery.website_url}</a>
				</div>
			</Card.Content>
		</Card>
	);
}
