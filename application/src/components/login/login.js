import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { logoutUser } from '../../redux/actions/authActions';
import LoginForm from './login-form/loginForm';

import './login.css';

const mapActionsToProps = dispatch => ({
	logout() {
		dispatch(logoutUser())
	}
})

class Login extends Component {
	constructor(props) {
		super(props);

		if (this.props.location.state != undefined && this.props.location.state.logout_user == true) {
			this.props.logout();
		}
	}

	render() {
		return (
			<div className="main-body">
				<h1 className="text-center">Login Screen</h1>
				<div className="d-flex justify-content-center mt-5">
					<LoginForm onLogin={() => {this.props.history.push('/view-orders')}}/>
				</div>
			</div>
		)
	}
}

export default connect(null, mapActionsToProps)(Login);