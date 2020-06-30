import React from 'react';
import { Header, Menu, Dropdown, Grid, Segment } from 'semantic-ui-react';
import ReviewForm from '../posts/ReviewForm';

//This is the landing page for users.  It should show their feed (includes their posts, and other users)
// option to create a post/review, and find a brewery
export default class Home extends React.Component {
  state = { activeItem: 'feed' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

  return (
    <div>
  <Header style={{margin:"20px"}} as='h1'>Beer Review</Header>
  <Menu vertical floated="right">
  <Dropdown item icon='add'text='Add'>
    <Dropdown.Menu>
      <Dropdown.Item>Review</Dropdown.Item>
      <Dropdown.Item>Post</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</Menu>
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
              name='find breweries'
              active={activeItem === 'find breweries'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='links'
              active={activeItem === 'links'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            This is an stretched grid column. This segment will always match the
            tab height
          </Segment>
        </Grid.Column>
      </Grid>

</div>
  )
  //put user_id feed of posts here

  }
};


// const background = {
//   backgroundColor:"#D9AFD9",
//   backgroundImage:'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)'
  
// }