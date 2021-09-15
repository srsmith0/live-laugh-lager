import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import PostListItem from './PostListItem';

export default function PostList({ userId }) {
	const [ posts, setPosts ] = useState([]);
	const [ reviews, setReviews ] = useState([]);
	const [ followedPosts, setFollowedPosts ] = useState([]);
	const [ followedReviews, setFollowedReviews ] = useState([]);

	useEffect(() => {
		getMyPosts();
		getMyReviews();
		getMyFollowedPosts();
		getMyFollowedReviews();
	}, []);

	function getMyPosts() {
		Axios.get(`/api/users/${userId}/posts`).then((res) => {
			setPosts(res.data);
		});
	}

	function getMyReviews() {
		Axios.get(`/api/users/${userId}/reviews`).then((res) => {
			setReviews(res.data);
		});
	}

	function getMyFollowedReviews() {
		Axios.get(`/api/followed_reviews/${userId}`).then((res) => {
			setFollowedReviews(res.data);
		});
	}

	function getMyFollowedPosts() {
		Axios.get(`/api/followed_posts/${userId}`).then((res) => {
			setFollowedPosts(res.data);
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
		};
		return comparison;
	}

	let allPosts = [ ...reviews, ...followedReviews, ...posts, ...followedPosts ];
	let sortedPosts = allPosts.sort(compare);

	return sortedPosts.map((p) => <PostListItem key={p.title + p.id.toString()} item={p} />);
}
