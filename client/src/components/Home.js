import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export default function Home () {
  return (
    <>
    <h1 style={{textAlign:"center", marginTop:"100px"}}>Welcome to Five 'o' Clock</h1>
    <h3 style={{textAlign:"center", marginTop:"50px"}}>Your one stop for beer reviews, beer posts, and brewery locator</h3>
    <div>
    <Button as={Link} to="/register">Register</Button> 
    <Button as={Link} to="/login">Login</Button> 
    </div>
    </>
  )
}