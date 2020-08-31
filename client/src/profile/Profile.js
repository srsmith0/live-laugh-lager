import React from 'react';
import { Header, Menu, Dropdown, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../providers/AuthProvider';
import PostList from '../posts/PostList';
import Settings from './Settings';
import FindBrewery from '../FindBrewery/FindBrewery';
import ShowFollowers from './ShowFollowers';
import ShowFollowees from './ShowFollowees';

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
				<Header style={{ margin: '20px', textAlign: 'center' }} as="h1">
					Live, Laugh, Lager
				</Header>
				<Grid>
					<Grid.Column width={4}>
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
							<Menu.Item
								icon="find"
								name="breweries"
								active={activeItem === 'breweries'}
								onClick={this.handleItemClick}
							/>{' '}
							<Dropdown item icon="add" text="Add">
								<Dropdown.Menu>
									<Dropdown.Item as={Link} to="/review" props={this.props}>
										Review
									</Dropdown.Item>
									<Dropdown.Item as={Link} to="/post" props={this.props}>
										Post
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							<Menu.Item
								name="settings"
								icon="settings"
								active={activeItem === 'settings'}
								onClick={this.handleItemClick}
							/>
						</Menu>
					</Grid.Column>

					<Grid.Column stretched width={12}>
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
