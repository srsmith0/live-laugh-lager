import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import PostListItem from '../posts/PostListItem';
import { AuthConsumer } from '../providers/AuthProvider';
import { Button } from 'semantic-ui-react';

function UserPage(props) {
	const [ posts, setPosts ] = useState([]);
	const [ reviews, setReviews ] = useState([]);
	const [ follow, setFollow ] = useState({});
	const [ success, setSuccess ] = useState('');
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
			getFollow();
		});
	}

	function followUser(userName) {
		Axios.get(`/api/user/${userName}`)
			.then((res) => {
				Axios.post(`/api/user/${res.data.id}/follow/${props.auth.user.id}`, {
					user_id: res.data.id,
					follower_id: props.auth.user.id
				}).then((res) => {
					{
						res.data.message ? alert(`${res.data.message}`) : setSuccess(`Now following ${userName}`);
					}
					getFollow();
				});
			})
			.catch(() => {
				alert('User does not exist');
			});
		setTimeout(emptySuccess, 3000);
	}

	function emptySuccess() {
		setSuccess('');
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
			<div className="showUser">
				{user.id === props.auth.user.id ? (
					<div className="userTop">
						<h1 className="showUserHeader">My Posts and Reviews</h1>
						<h3 className="userName">Name: {user.name}</h3>
					</div>
				) : (
					<div className="userTop">
						<h1 className="showUserHeader">{user.nickname}</h1>
						<h3 className="userName">Name: {user.name}</h3>
					</div>
				)}
				<div className="followButtons">
					<Button color="blue" onClick={props.history.goBack}>
						Go Back
					</Button>
					<br />
					{follow && user.id !== props.auth.user.id ? (
						<Button color="orange" onClick={() => unFollow()}>
							Unfollow
						</Button>
					) : null}
					{!follow ? (
						<Button color="grey" onClick={() => followUser(user.nickname)}>
							Follow
						</Button>
					) : null}
					<br />
					{success !== '' ? `${success}` : null}
				</div>
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
