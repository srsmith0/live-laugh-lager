import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function ShowPost ({id, user_id}) {
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])

  useEffect(() => {
    debugger;
    Axios.get(`/api/users/${user_id}/posts/${id}`)
    .then((res) => {
      setPost(res.data)
    })
    Axios.get(`/api/users/${user_id}/posts/${id}/comments`)
    .then((res) => {
      setComments(res.data)
    })
  },[])

return (
  <>
  <h1>{post.title}</h1>
  <p>{post.content}</p>
    <div>
      {comments.map(c => (
        <div>
          {c.content}
          Likes: {c.likes}
          </div>
      ))}
    </div>
  </>
)


}
