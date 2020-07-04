import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function PostList (props) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    Axios.get(`/api/users/${props.user_id}/posts`)
    .then((res) => {
      setPosts(res.data)
    })
  }, [])

  return (
    posts.map((p) => (
     <div>
       <h1>{p.title}</h1>
       <p>{p.content}</p>
     </div> 
    ))
  )
}

//complies all posts from users and displays them chronologically