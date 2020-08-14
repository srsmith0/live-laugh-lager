import React from 'react';
import { Header, Menu, Dropdown, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../providers/AuthProvider';
import PostList from '../posts/PostList';

class Profile extends React.Component {
  state = { activeItem: 'feed'};
 

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderMyPosts = () => {
    return (
      //try to pass user id to Post List here
      <PostList user_id={this.props.auth.user.id}/>
    )
  }

  renderAllPosts () {
    //TODO list posts of followers and own posts
  }

  renderFollowers () {
    return (
      //TODO list followers
      <div>
        <h1>Finish the function!</h1>
      </div>
    )
  }

  renderOptions (activeItem) {
    switch (activeItem) {
      case "feed":
        return this.renderMyPosts()

        case "followers":
        return this.renderFollowers()

        default: 
        return this.renderMyPosts()
    }
  }

  render() {
    const { activeItem } = this.state

  return (
    <div>
  <Header style={{margin:"20px", textAlign:"center"}} as='h1'>Live, Laugh, Lager</Header>
  <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              icon='feed'
              name='feed'
              active={activeItem === 'feed'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              icon='users'
              name='followers'
              active={activeItem === 'followers'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              icon='find'
              name='find breweries'
              active={activeItem === 'breweries'}
              onClick={this.handleItemClick}
            /> 
            <Dropdown item icon='add'text='Add'>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/review' props={this.props}>Review</Dropdown.Item>
                <Dropdown.Item as={Link} to='/post' props={this.props}>Post</Dropdown.Item>
               </Dropdown.Menu>
            </Dropdown>
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            {this.renderOptions(activeItem)}
          </Segment>
        </Grid.Column>
      </Grid>

</div>
  )

  }
};

class ConnectedProfile extends React.Component {
  render () {
    return (
      <AuthConsumer>
        { (auth) => <Profile {...this.props} auth={auth} />}
      </AuthConsumer>
    )
  }
}

export default ConnectedProfile


// const background = {
//   backgroundColor:"#D9AFD9",
//   backgroundImage:'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)'
  
// }