import React from 'react';
import { connect } from 'react-redux';

const Header = (props) => {
	function renderContent() {
		switch (props.auth) {
			case null:
				return;
			case false:
				return <li><a href="/auth/google">Log in with Google</a></li>;
			default:
				return <li><a href="/api/logout">Log out</a></li>;
		}
	}

	return (
		<nav>
			<div className="nav-wrapper">
				<a className="left brand-logo">Emaily</a>
				<ul id="nav-mobile" className="right">
					<li>{renderContent()}</li>
				</ul>
			</div>
		</nav>
	);
};

const mapStateToProps = ({ auth }) => {
	return { auth: auth };
};

export default connect(mapStateToProps)(Header);
