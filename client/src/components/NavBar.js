import React from 'react';
import { AuthConsumer } from '../providers/AuthProvider';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends React.Component {
	rightNavItems = () => {
		const { auth: { user, handleLogout }, location } = this.props;

		if (user) {
			return (
				<Menu.Menu position="right">
					<Menu.Item name="Logout" onClick={() => handleLogout(this.props.history)} icon="sign-out" />
				</Menu.Menu>
			);
		} else {
			return null;
		}
	};

	render() {
		if (this.props.auth.user) {
			return (
				<div>
					<Menu pointing secondary style={background}>
						<Link to="/">
							<Menu.Item
								id="home"
								name="home"
								icon="home"
								active={this.props.location.pathname === '/'}
							/>
						</Link>
						<Link to="/profile">
							<Menu.Item
								id="profile"
								name="Profile"
								icon="beer"
								active={this.props.location.pathname === '/profile'}
							/>
						</Link>
						{this.rightNavItems()}
					</Menu>
				</div>
			);
		} else {
			return null;
		}
	}
}

class ConnectedNavBar extends React.Component {
	render() {
		return <AuthConsumer>{(auth) => <NavBar {...this.props} auth={auth} />}</AuthConsumer>;
	}
}

export default withRouter(ConnectedNavBar);

const background = {
	background: 'linear-gradient(#ffd952, 30%,  #ffeeb3)'
};
