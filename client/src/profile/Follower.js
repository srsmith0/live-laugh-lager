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
				<h2 className="follower">{follower.nickname}</h2>
			</Link>
			<hr className="hr2" />
		</div>
	);
}
