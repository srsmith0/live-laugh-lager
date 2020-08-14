import React, { useState } from'react';
import { AuthConsumer } from '../providers/AuthProvider';
import Axios from 'axios';

function Settings (props) {
const [firstName, setFirstName] = useState(props.auth.user.name)
const [email, setEmail] = useState(props.auth.user.email)
const [username, setUsername] = useState(props.auth.user.nickname)
const [editing, setEditing] = useState(false)

const user = {
  name: firstName,
  nickname: username,
  email: email,
  id: props.auth.user.id,
}

function handleSubmit(e) {
  e.preventDefault();
  props.auth.handleEdit(user)
  setEditing(!editing)
}

function removeUser() {
  props.auth.handleLogout(props.history)
  Axios.delete(`/api/users/${user.id}`)
}

function changePassword(){
  
}


  return (
    <>
    <h1 style={{textAlign: "center"}} >Account Settings</h1>
      <form onSubmit={handleSubmit}>
        <p>Name:  
          <input
        label="First Name"
        value={firstName}
        onChange={editing? (e) => setFirstName(e.target.value) : null}
        /></p>
        <p>Username:  
          <input
        label="Username"
        value={username}
        onChange={editing? (e) => setUsername(e.target.value) : null}
        /></p>
        <p>Email:  
          <input
        label="Email"
        value={email}
        onChange={editing? (e) => setEmail(e.target.value) : null}
        /></p>
        {editing ? <button>Submit</button> : null}
      </form>
      <button onClick={() => setEditing(!editing)}>Edit</button>
      <button style={{color:"red"}} onClick={() => removeUser()}>Delete Account</button>
 
    
    </>
  )
}

function ConnectedSettings (props) {
    return (
      <AuthConsumer>
        { (auth) => <Settings {...props} auth={auth} />}
      </AuthConsumer>
    )
}

export default ConnectedSettings