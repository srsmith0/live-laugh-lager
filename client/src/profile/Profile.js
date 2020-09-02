import React from 'react';
import './Profile.css';
import { Header, Menu, Dropdown, Grid, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../providers/AuthProvider';
import PostList from '../posts/PostList';
import Settings from './Settings';
import FindBrewery from '../FindBrewery/FindBrewery';
import ShowFollowers from './ShowFollowers';
import ShowFollowees from './ShowFollowees';
import ReviewForm from '../posts/ReviewForm';
import PostForm from '../posts/PostForm';
import Footer from '../components/Footer';

class Profile extends React.Component {
	state = { activeItem: 'feed' };

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	renderMyPosts = () => {
		return <PostList userId={this.props.auth.user.id} />;
	};

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
				return this.renderMyPosts();

			case 'followers':
				return this.renderFollowers();

			case 'users i follow':
				return this.renderFollowees();

			case 'add review':
				return <ReviewForm props={this.props} handleItemClick={this.handleItemClick} />;

			case 'add post':
				return <PostForm props={this.props} handleItemClick={this.handleItemClick} />;

			case 'breweries':
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
							<Menu.Item icon="write" name="add review" as={Link} to="/review" />
							<Menu.Item icon="write" name="add post" as={Link} to="/post" />
							<Menu.Item
								icon="find"
								name="breweries"
								active={activeItem === 'breweries'}
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
