import React from 'react';
import './Profile.css';
import { Menu, Grid, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../providers/AuthProvider';
import PostList from '../posts/PostList';
import Settings from './Settings';
import ShowFollowers from './ShowFollowers';
import ShowFollowees from './ShowFollowees';
import ReviewForm from '../posts/ReviewForm';
import PostForm from '../posts/PostForm';
import FindBrewery from '../FindBrewery/FindBrewery';
import FollowForm from './FollowForm';
import MyPosts from '../posts/MyPosts';
import MyReviews from '../posts/MyReviews';

class Profile extends React.Component {
	state = { activeItem: 'feed' }

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	renderAllPosts = () => {
		return <PostList userId={this.props.auth.user.id} />;
	}

	renderMyReviews = () => {
		return <MyReviews currentUserId={this.props.auth.user.id} />;
	}

	renderMyPosts = () => {
		return <MyPosts currentUserId={this.props.auth.user.id} />;
	}

	renderFollowers() {
		return <ShowFollowers userId={this.props.auth.user.id} />;
	}

	renderFollowees() {
		return <ShowFollowees userId={this.props.auth.user.id} />;
	}

	renderAdd() {
		return (
			<div>
				<Button as={Link} to="/post">
					Add Post
				</Button>
				<Button as={Link} to="/review">
					Add Review
				</Button>
			</div>
		);
	}

	renderSettings() {
		return <Settings />;
	}

	renderOptions(activeItem) {
		switch (activeItem) {
			case 'feed':
				return this.renderAllPosts();
			
			case 'my reviews':
				return this.renderMyReviews();
			
			case 'my posts':
				return this.renderMyPosts();

			case 'followers':
				return this.renderFollowers();

			case 'users i follow':
				return this.renderFollowees();

			case 'find drinking buddies':
				return <FollowForm />;

			case 'add review':
				return <ReviewForm props={this.props} handleItemClick={this.handleItemClick} />;

			case 'add post':
				return <PostForm props={this.props} handleItemClick={this.handleItemClick} />;

			case 'find breweries':
				return <FindBrewery history={this.props.history} />;

			case 'settings':
				return <Settings history={this.props.history} />;

			default:
				return this.renderMyPosts();
		}
	}

	render() {
		const { activeItem } = this.state;

		return (
			<div>
				<h1 className="titleProfile">Live, Laugh, Lager</h1>
				<Grid textAlign="center" className="grid">
					<Grid.Column mobile="6" computer="3">
						<Menu fluid vertical tabular>
							<Menu.Item
								icon="feed"
								name="feed"
								active={activeItem === 'feed'}
								onClick={this.handleItemClick}
							/>
														<Menu.Item
								icon="beer"
								name="my reviews"
								active={activeItem === 'my reviews'}
								onClick={this.handleItemClick}
							/>
														<Menu.Item
								icon="write square"
								name="my posts"
								active={activeItem === 'my posts'}
								onClick={this.handleItemClick}
							/>
							<Menu.Item
								icon="users"
								name="followers"
								active={activeItem === 'followers'}
								onClick={this.handleItemClick}
							/>
							<Menu.Item
								icon="users"
								name="users i follow"
								active={activeItem === 'users i follow'}
								onClick={this.handleItemClick}
							/>
							<Menu.Item
								icon="user plus"
								name="find drinking buddies"
								active={activeItem === 'find drinking buddies'}
								onClick={this.handleItemClick}
							/>
							<Menu.Item icon="write" name="add review" as={Link} to="/review" />
							<Menu.Item icon="write" name="add post" as={Link} to="/post" />
							<Menu.Item
								icon="find"
								name="find breweries"
								active={activeItem === 'find breweries'}
								onClick={this.handleItemClick}
							/>
							<Menu.Item
								name="settings"
								icon="settings"
								active={activeItem === 'settings'}
								onClick={this.handleItemClick}
							/>
						</Menu>
					</Grid.Column>
					<Grid.Column className="gridContent" width={8}>
						<Segment>{this.renderOptions(activeItem)}</Segment>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

class ConnectedProfile extends React.Component {
	render() {
		return <AuthConsumer>{(auth) => <Profile {...this.props} auth={auth} />}</AuthConsumer>;
	}
}

export default ConnectedProfile;
