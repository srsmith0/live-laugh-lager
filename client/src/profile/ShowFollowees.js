import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Follower from './Follower';

export default function ShowFollowers({ userId }) {
	const [ followees, setFollowees ] = useState([]);

	useEffect(() => {
		Axios.get(`/api/followees/${userId}`).then((res) => {
			setFollowees(res.data);
		});
	}, []);

	function renderFollowees() {
		return followees.map((f) => {
			if (f.id !== userId) {
				return (
					<div key={f.id}>
						<Follower follower={f} />
					</div>
				);
			}
		});
	}

	return <div>{renderFollowees()}</div>;
}
