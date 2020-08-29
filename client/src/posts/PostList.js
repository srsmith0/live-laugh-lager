import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function PostList({ user_id }) {
	const [ posts, setPosts ] = useState([]);
	const [ reviews, setReviews ] = useState([]);

	//create a combined function on backend to gather user posts and followed posts/reviews
	useEffect(() => {
		Axios.get(`/api/users/${user_id}/posts`).then((res) => {
			setPosts(res.data);
		});
		Axios.get(`/api/users/${user_id}/reviews`).then((res) => {
			setReviews(res.data);
		});
	}, []);

	let allPosts = [ ...reviews, ...posts ];

	function compare(a, b) {
		const createA = a.created_at;
		const createB = b.created_at;

		let comparison = 0;
		if (createA > createB) {
			comparison = -1;
		} else if (createA < createB) {
			comparison = 1;
		}
		return comparison;
	}

	let sortedPosts = allPosts.sort(compare);

	return sortedPosts.map((p) => (
		<div key={p.content ? `post-${p.id}` : `review-${p.id}`}>
			<h1>
				<Link
					to={
						p.title ? (
							{
								pathname: `/post/${p.id}`,
								state: { user_id: user_id }
							}
						) : (
							{
								pathname: `/review/${p.id} `,
								state: { user_id: user_id }
							}
						)
					}
				>
					{p.title ? p.title : `${p.name} Review`}
				</Link>
			</h1>
			<p>{p.title ? p.content : null}</p>
		</div>
	));
}
