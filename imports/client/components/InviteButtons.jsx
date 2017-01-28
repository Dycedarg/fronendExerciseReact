import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Profiles, tags as tagResults } from '../../api/collections.js';

export class InviteButton extends Component{
	constructor(){
		super();
		this.state = {
			sent: false
		}
	}

	inviteUser(){
		if(this.state.sent === false){
			this.setState({sent: true});
			this.props.onSuccess();
			Meteor.call('inviteUser', this.props.username, (error, response)=>{
				if(error){
					this.setState({sent: false});
					this.props.onFailure();
				}else{
					console.log(response);
					this.props.onSuccess();
				}
			});
		}
	}

	render(){
		return( 
			<button type='button' className={`btn btn-sm btn-default btn-action ${(this.state.sent || this.props.allClicked) ? "btn-sent disabled":"btn-invite"}`} onClick={this.inviteUser.bind(this)}>
				{(this.state.sent || this.props.allClicked) ? "Sent":"Invite"}
			</button>
		)
	}
}

export class InviteAllButton extends InviteButton{
	
	inviteUsers(){
		if(this.state.sent === false){
			this.setState({sent: true});
			this.props.onClicked();
			Meteor.call('inviteUsers', this.props.usernames, (error, response)=>{
				if(error){
					this.setState({sent: false});
					this.props.onFailure();
				}else{
					console.log(response);
					this.props.onClicked();
				}
			});
		}
	}

	render(){
		return(
			<button type='button' className={`btn btn-sm btn-default btn-action ${(this.state.sent) ? "btn-sent-all disabled":"btn-invite-all"} pull-right`} onClick={this.inviteUsers.bind(this)}>
				{(this.state.sent) ? "All Sent":"Invite All"}
			</button>
		)
	}
}