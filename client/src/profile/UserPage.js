import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import PostListItem from '../posts/PostListItem';
import { AuthConsumer } from '../providers/AuthProvider';
import { Button } from 'semantic-ui-react';

function UserPage(props) {
	const [ posts, setPosts ] = useState([]);
	const [ reviews, setReviews ] = useState([]);
	const [ follow, setFollow ] = useState({});
	const { user } = props.location.state;

	useEffect(() => {
		getPosts();
		getReviews();
		getFollow();
	}, []);

	function getFollow() {
		Axios.get(`/api/follows/follower/${props.auth.user.id}/user/${user.id}`).then((res) => {
			setFollow(res.data);
		});
	}

	function getPosts() {
		Axios.get(`/api/users/${user.id}/posts`).then((res) => {
			setPosts(res.data);
		});
	}

	function getReviews() {
		Axios.get(`/api/users/${user.id}/reviews`).then((res) => {
			setReviews(res.data);
		});
	}

	function unFollow() {
		Axios.delete(`/api/follows/${follow.id}`, follow).then((res) => {
			props.history.push('/profile');
		});
	}

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

	let allPosts = [ ...reviews, ...posts ];
	let sortedPosts = allPosts.sort(compare);

	if (props.auth.user) {
		return (
			<div>
				{user.id === props.auth.user.id ? <h1>My Posts and Reviews</h1> : <h1>{user.nickname}</h1>}
				{user.id !== props.auth.user.id ? (
					<Button color="orange" onClick={() => unFollow()}>
						Unfollow
					</Button>
				) : null}
				{sortedPosts.map((p) => <PostListItem userId={user.id} item={p} />)}
			</div>
		);
	} else {
		return <div>{props.history.push('/')}</div>;
	}
}

function ConnectedUserPage(props) {
	return <AuthConsumer>{(auth) => <UserPage {...props} auth={auth} />}</AuthConsumer>;
}

export default ConnectedUserPage;
