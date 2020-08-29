import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function PostListItem({ item, userId }) {
	const [ name, setName ] = useState('');

	function setAuthor(id) {
		Axios.get(`/api/set_user/${id}`).then((res) => {
			setName(res.data.nickname);
		});
	}

	return (
		<div key={item.content ? `post-${item.id}` : `review-${item.id}`}>
			<h1>
				<Link
					to={
						item.title ? (
							{
								pathname: `/post/${item.id}`,
								state: { userId: userId }
							}
						) : (
							{
								pathname: `/review/${item.id} `,
								state: { userId: userId }
							}
						)
					}
				>
					{item.title ? item.title : `${item.name} Review`}
				</Link>
			</h1>
			<p>{item.title ? item.content : null}</p>
			<p>Author: {(setAuthor(item.user_id), name)} </p>
		</div>
	);
}
