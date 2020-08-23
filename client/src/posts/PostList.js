import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export default function PostList({ user_id }) {
	const [ posts, setPosts ] = useState([]);
	const [ reviews, setReviews ] = useState([]);

	useEffect(() => {
		Axios.get(`/api/users/${user_id}/posts`).then((res) => {
			setPosts(res.data);
		});
		Axios.get(`/api/users/${user_id}/reviews`).then((res) => {
			setReviews(res.data);
		});
	}, []);

	const deletePost = (post) => {
		Axios.delete(`/api/users/${user_id}/posts/${post.id}`).then((res) => {
			setPosts(posts.filter((p) => p.id !== post.id));
		});
	};

	let allPosts = [ ...reviews, ...posts ];

	let sortedPosts = allPosts.sort((a, b) => b.id - a.id);

	return sortedPosts.map((p) => (
		<div key={p.id}>
			<h1>
				<Link
					to={
						p.content ? (
							{
								pathname: `/post/${p.id}`,
								postProps: { ...p }
							}
						) : (
							{
								pathname: `/review/${p.id} `,
								reviewProps: { ...p }
							}
						)
					}
				>
					{p.content ? p.title : `${p.name} Review`}
				</Link>
			</h1>
			<p>{p.content ? p.content : null}</p>
			{p.content ? <Button onClick={() => deletePost(p)}>Delete</Button> : null}
		</div>
	));
}
