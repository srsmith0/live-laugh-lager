import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Follower from './Follower';

export default function ShowFollowers({ userId }) {
	const [ followers, setFollowers ] = useState([]);

	useEffect(() => {
		Axios.get(`/api/followers/${userId}`).then((res) => {
			console.log(res.data);
			setFollowers(res.data);
		});
	}, []);

	function renderFollowers() {
		return followers.map((f) => (
			<div key={f.id}>
				<Follower follower={f} />
			</div>
		));
	}

	return <div>{renderFollowers()}</div>;
}
