import React, { Component } from 'react';

class Header extends Component {
	constructor(props) {
		super(props);
	}
	render(props) {
		return (
			<div className="masthead clearfix">
				<div className="inner">
					<h3 className="masthead-brand">Cover</h3>
					<nav className="nav nav-masthead">
						<a	href="/"
							className={"nav-link" + (
								this.props.page == "home"
									? " active"
									: " "
							)}>
							Home
						</a>
						<a	href="/login"
							className={"nav-link" + (
								this.props.page == "login"
									? " active"
									: " "
							)}>
							Sign In
						</a>
						<a	href="#"
							className={"nav-link" + (
								this.props.page == "contact"
									? " active"
									: " "
							)}>
							Contact
						</a>
					</nav>
				</div>
			</div>
		);
	}
}

export default Header;
