import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button } from 'semantic-ui-react';

export default function ShowPost (props) {
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])

  useEffect(() => {
    Axios.get(`/api/users/${props.location.showProps.user_id}/posts/${props.location.showProps.id}`)
    .then((res) => {
      setPost(res.data)
    })
    Axios.get(`/api/users/${props.location.showProps.user_id}/posts/${props.location.showProps.id}/comments`)
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
    <Button onClick={props.history.goBack}>Go Back</Button>
  </>
)


}
