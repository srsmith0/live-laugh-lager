import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import PostListItem from './PostListItem';

function MyReviews( { currentUserId }) {
  const [myReviews, setMyReviews] = useState('')

  useEffect(() => {
    Axios.get(`/api/users/${currentUserId}/reviews`)
      .then((res) => {
        setMyReviews(res.data);
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
  
  const sortedReviews = myReviews ? myReviews.sort(compare) : null;

  if (!myReviews) {
    return 'Loading...';
  } else {
    return sortedReviews.map(review => <PostListItem key={review.id.toString() + review.title} item={review} />);
  }
};

export default MyReviews;