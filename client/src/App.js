import React from 'react';
import './App.css';
import Profile from './profile/Profile';
import NavBar from './components/NavBar';
import NoMatch from './components/NoMatch';
import Login from './components/Login';
import Register from './components/Register';
import { Switch, Route } from 'react-router-dom';
import FetchUser from './components/FetchUser';
import ProtectedRoute from './components/ProtectedRoute';
import ReviewForm from './posts/ReviewForm';
import PostForm from './posts/PostForm';
import Home from './components/Home';
import PostList from './posts/PostList';
import ShowPost from './posts/ShowPost';
import Settings from './profile/Settings';
import ShowReview from './posts/ShowReview'

function App() {
  return (
    <>
    <NavBar />
    <FetchUser>
      <Switch>
        <Route exact path ='/' component={Home} />
        <ProtectedRoute exact path='/settings' component={Settings} />
        <ProtectedRoute exact path='/profile' component={Profile} />
        <ProtectedRoute exact path='/posts' component={PostList} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <ProtectedRoute exact path='/review' component={ReviewForm} />
        <ProtectedRoute exact path='/post' component={PostForm} />
        <Route exact path='/post/:id' component={ShowPost} />
        <Route exact path='/review/:id' component={ShowReview} />
        <Route component={NoMatch} /> 
      </Switch>
    </FetchUser>
    </>
  );
}

export default App;


