import React from 'react';

export default function Follower({ follower, key }) {
	return <div key={follower.id}>{follower.nickname}</div>;
}
