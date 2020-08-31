import React from 'react';
import { Link } from 'react-router-dom';

export default function Follower({ follower }) {
	return (
		<div key={follower.id}>
			<Link
				to={{
					pathname: `/user/${follower.id}`,
					state: { user: follower }
				}}
			>
				{follower.nickname}
			</Link>
		</div>
	);
}
