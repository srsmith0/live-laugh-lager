import React from 'react';
import { Link } from 'react-router-dom';

export default function Home () {
  return (
    <>
    <h1>This is the landing page.</h1>
    <h3>Go to <Link to='/profile'>profile</Link></h3>
    </>
  )
}