import React from 'react';
import { Header, Menu, Dropdown, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../providers/AuthProvider';
import PostList from '../posts/PostList';

export default class Profile extends React.Component {
  state = { activeItem: 'feed', activeInfo: 'posts'};

  //how to set state with multiple keys AND using AuthContext?
  //will need to set activeInfo state to followee's posts/reviews


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  // setInfo = ({}) => this.setState({ activeInfo })

  renderMyPosts () {
    return (
      <PostList props={this.props} />
    )
  }

  renderAllPosts () {
    
  }

  renderFollowers () {

  }

  render() {
    const { activeItem } = this.state

  return (
    <div>
  <Header style={{margin:"20px", textAlign:"center"}} as='h1'>Five 'o' Clock</Header>
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
              active={activeItem === 'find breweries'}
              onClick={this.handleItemClick}
            /> 
            <Dropdown item icon='add'text='Add'>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/review'>Review</Dropdown.Item>
                <Dropdown.Item as={Link} to='/post'>Post</Dropdown.Item>
               </Dropdown.Menu>
            </Dropdown>
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            {this.renderMyPosts()}
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


// const background = {
//   backgroundColor:"#D9AFD9",
//   backgroundImage:'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)'
  
// }