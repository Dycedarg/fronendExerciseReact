import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Profiles, tags as tagResults } from '../../api/collections.js';
import { InviteButton, InviteAllButton } from './InviteButtons';
import ErrorAlert from './Alerts';

export default class UserResults extends TrackerReact(Component){

	constructor(){
		super();
		this.state = {
			allClicked: false,
			invitationError: false
		};
	}

	usersWithTags(){
		return Profiles.find({
			"profile.following.tags":{
				$elemMatch: {$in: this.props.tags}
			}
		}).fetch();
	}

	showTitle(){
		if(this.props.title){
			return <h3>{this.props.title}{this.showInviteAll()}</h3>
		}
	}

	allClicked(){
		this.setState({
			allClicked: true
		})
	}

	noneClicked(){
		this.setState({
			allClicked: false,
			invitationError: true
		})
	}

	successInvite(){
		this.setState({
			invitationError: false
		})
	}

	failedInvite(){
		this.setState({
			inviationError: true
		})
	}

	showInviteAll(){
		if(this.props.canInviteAll)
			return (
				<InviteAllButton usernames={this.usersWithTags().map(user=>user.username)} onClicked={this.allClicked.bind(this)} onFailure={this.noneClicked.bind(this)} />
			)
	}

	userLineItems(){
		return this.usersWithTags().map((user, index)=>this.userLineItem(user, index));
	}

	userLineItem(user, index){
		return (
			<li className="row container-fluid list-group-item" key={`${user.username}-${index}`}>
				<div className="graphic pull-left">
					<img src={`/${user.img || "img-user-default.png"}`} alt='img' width="45" height="45"/>
				</div>
			    <div className="invite pull-right">
			        <InviteButton username={user.username} allClicked={this.state.allClicked} onSuccess={this.successInvite.bind(this)} onFailure={this.failedInvite.bind(this)} />
			    </div>
			    <div className="user-info info">
			    	<div className="user-info-item user-full-name">
			    		{user.name}
			    	</div>
			    	<div className="user-info-item user-titles">
			    		{user.titles.map(title=>(<span className="user-title" key={title}>{title}</span>))}
			    	</div>
			    </div>
			</li>
		)
	}

	render(){
		return (
			<div>
				<ErrorAlert show={this.invitationError}/>
				{this.showTitle()}
				<div className="panel panel-default">
					<div className="panel-body panel-users">
						<ul className="list-group">
						    {this.userLineItems()}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}