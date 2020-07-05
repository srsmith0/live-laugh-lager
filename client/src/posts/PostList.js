import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export default function PostList (props) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    Axios.get(`/api/users/${props.user_id}/posts`)
    .then((res) => {
      setPosts(res.data)
    })
  }, [])

  const deletePost = (post) => {
    Axios.delete(`/api/users/${post.user_id}/posts/${post.id}`)
    .then((res) => {
      setPosts(posts.filter(p => p.id !== post.id))
    })
  }

  //ask James best way to sort.  Won't work with created_at
  let sortedPosts = posts.sort((a, b) => b.id - a.id)

  //need to pass user_id and id to ShowPost...but how?
  //small change, trying to push to github
  return (
    sortedPosts.map((p) => (
     <div key={p.id}>
       <h1><Link to='/showPost' id={p.id} user_id={p.user_id}>{p.title}</Link></h1>
       <p>{p.content}</p>
       <Button onClick={() => deletePost(p)}>Delete</Button>
     </div> 
    ))
  )
}