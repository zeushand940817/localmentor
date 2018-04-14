import React, { Component } from 'react';
import DashboardNav from '../components/user/dashboardNav'
import ConnectionsList from '../components/user/connectionsList'
import Head from '../components/head'
import { getTags } from '../lib/api/user';
import SearchBar from '../components/user/searchBar'
import { searchTags } from '../lib/api/user'

export default class MyConnectionsTest extends Component {

	constructor(props) {
		super(props);
		this.state = {
			inputSearch: '',
			tab: 0
		};
	}

	async loadTags() {
		const tags = await getTags();
		this.setState({ tags });
	}

	async componentDidMount() {
		if (!this.props.user)
			window.location = '/login';
		await this.loadTags();
	}

	static getInitialProps({ req }) {
		const user = req.session.user;
		return { user };
	}

	render() {
		const pageTitle = "My Connections";

		return (
			<div>
				<Head
					cssFiles={[
						"dashboard.css",
						"dashboardNav.css",
						"profileCard.css",
						"react-select.min.css",
						"jumbo.css"
					]}
					title="Dashboard" />
				<div className="app-container">
					<div className="site-wrapper">
						<div >
							<div className="cover-container">
							<p></p>
								<DashboardNav
									pageTitle={pageTitle}
									user={this.props.user}
								/>

								<p>&nbsp;</p>
								<p>&nbsp;</p>
								<p>&nbsp;</p>

								<div className="jumbotron trans">
									<h1>Connections</h1>

									<button id = "mentorButton" className="btn btn-primary" onClick={() => this.state.tab = 0}>
										{"Mentors"}
									</button>

									<button id = "menteeButton" className="btn btn-primary" onClick={() => this.state.tab = 1}>
										{"MENTES"}
									</button>

									<button id = "requestButton" className="btn btn-primary" onClick={() => this.state.tab = 2}>
										{"Requests"}
									</button>

									<p><p></p></p>


									<ConnectionsList
										user={this.props.user}
										tab = {this.state.tab}/>


								</div>


							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}
}
