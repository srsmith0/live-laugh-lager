import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import PostListItem from './PostListItem';

function MyPosts( { currentUserId }) {
  const [myPosts, setMyPosts] = useState('')

  useEffect(() => {
    Axios.get(`/api/users/${currentUserId}/posts`)
      .then((res) => {
        setMyPosts(res.data);
      })
  }, [])

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
  
  const sortedPosts = myPosts ? myPosts.sort(compare) : null;

  if (!myPosts) {
    return 'Loading...';
  } else {
    return sortedPosts.map(post => <PostListItem key={post.id.toString() + post.title} item={post} />);
  }
};

export default MyPosts;