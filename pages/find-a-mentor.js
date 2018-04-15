import React, { Component } from 'react';
import DashboardNav from '../components/user/dashboardNav'
import Head from '../components/head'
import MentorList from '../components/user/mentorList'
import { getTags } from '../lib/api/user';
import SearchBar from '../components/user/searchBar'
import { getLimitedProfile, searchTags } from '../lib/api/user'

export default class FindAMentor extends Component {
	constructor(props) {
		super(props);
		this.state = { inputSearch: '', tags: [] };
	}
	async loadTags() {
		const tags = await getTags();
		this.setState({ tags });
	}

	handleChange(e) {
		const value = e.target.value;
		if (e.target.id == "inputSearch")
			this.setState({inputSearch: value});
		else if (e.target.id == "inputPassword")
			this.setState({inputPassword: value});
	}

	async componentDidMount() {
		await this.loadTags();
	}

	async handleSearch (tags, location) {
		console.log("going to search, got tags:", tags);
		const mentors = await searchTags(tags, location);
		console.log("got these guys back: ", mentors);
		this.setState({ mentors });
	}

	static async getInitialProps({ req, res }) {
		const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
		const user = req.session.user;
		if (!user && res) { // if the user isn't logged in, send them to login
			res.writeHead(302, { Location: '/login' });
			res.end();
			res.finished = true;
		}
		const limitedProfile = await getLimitedProfile(baseUrl, user);
		return { limitedProfile, user };
	}

	render() {
		const pageTitle = "Find a Mentor";
		if (!this.props.limitedProfile.isMentee) {
			return this.renderRestrictedPage();
		}
		return (
			<div id="fullpage-container">
				<Head
					cssFiles={[
						"findMentor.css",
						"dashboardNav.css",
						"profileCard.css",
						"react-select.min.css",
						"jumbo.css"
					]}
					title={pageTitle} />
				<div>
					<DashboardNav
						pageTitle={pageTitle}
						user={this.props.user}
						md5={this.props.limitedProfile.email}
					/>
					<div className="cover-container">
						<div className="jumbotron trans">
							<h1>Find a Mentor</h1>

							<SearchBar
								onClick={this.handleSearch.bind(this)}
								tags={this.state.tags} />

							{this.state.mentors
								? (
									<MentorList
										mentors={this.state.mentors}
										user={this.props.user} />
								) : null
							}
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderRestrictedPage() {
		const pageTitle = "Find a Mentor";
		return (
			<div id="fullpage-container">
				<Head
					cssFiles={[
						"findMentor.css",
						"dashboardNav.css",
						"jumbo.css"
					]}
					title={pageTitle} />
				<div>
					<DashboardNav
						pageTitle={pageTitle}
						user={this.props.user}
						md5={this.props.limitedProfile.email}
					/>
					<div className="cover-container">
						<div className="jumbotron trans">
							<h1>Oops!</h1>
							<p>Your profile isn't set up to be a mentee, so you can't search/request any mentors until you update it.</p>
							<a href="/my-profile" className="btn btn-lg btn-primary">Edit Profile</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
