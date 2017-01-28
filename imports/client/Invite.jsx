import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Profiles, tags as tagResults } from '../api/collections.js';

export default class Invite extends Component{

	constructor(){
		super();
		this.searchOptions = ['interest','profile','email'];
		this.state = {
			searchBy: 'interest',
			tags: [],
			tagSuggestions: []
		}
	}

	onChangeSearchBy(searchBy){
		this.setState({searchBy});
	}

	onTypeKeyUpTag(e){
		const tagList = $('.tag-list');
		if(e.keyCode === 9){
			this.addTag(this.state.tagSuggestions[0]);
			e.currentTarget.value = ' ';
			tagList.hide();
		}else if(e.keyCode === 32){
			this.addTag(e.currentTarget.value);
			e.currentTarget.value = ' ';
			tagList.hide(0);
		}else{
			this.searchTags(e.currentTarget.value);
		}
	}

	onTypeKeyDownTag(e){
		const input = $('.tag-input');
		if(e.keyCode === 8 && input.caret('pos') === 0 && input.val().length === 0 ){
			this.removeTag()
		}else if(e.keyCode === 9){
			e.preventDefault();
			return false;
		}
	}

	addTag(tagName){
		$('.tag-list').hide(0);
		const tags = this.state.tags;
		const input = $('.tag-input');

		tags.push(tagName.trim());
		this.setState({tags});
		input.val('').focus();
	}

	removeTag(tagName){
		let tags = this.state.tags;
		let tag = '';

		if(tagName)
			tags = _.without(tags, tagName);
		else $('.tag-input').val(tags.pop());
		this.setState({tags});
		this.focusTag();

	}

	searchTags(queryString){
		const tagSuggestions = tagResults(queryString.trim());
		this.setState({tagSuggestions});

		const list = $('.tag-list');

		if(tagSuggestions.length){
			const input = $('.tag-input:last');
			
			list.css(input.position());
			list.show(0);
		}else{
			list.hide(0);
		}
	}

	focusTag(){
		$('.tag-input:last').focus();
	}

	render(){
		return (
			<div>
				<h3>Invite professionals to follow your product</h3>

				<SearchBySelect active={this.state.searchBy} buttons={this.searchOptions} onChange={this.onChangeSearchBy.bind(this)} />

				<br/>
				<div className="panel-body panel-tags form-control" onClick={this.focusTag}>
					{this.state.tags.map(tag=><div className="tag filter-tag" key={tag} onClick={()=>{this.removeTag(tag)}}>{tag}</div>)}
					<input type="text" id='tags' className="tag-input" onClick={e=>e.stopPropagation()} onKeyUp={e=>this.onTypeKeyUpTag(e)} onKeyDown={e=>this.onTypeKeyDownTag(e)} />
				</div>
				<i className="label">*Type product tags to identify users who may be interested in this product.</i>
				
				<TagsList tags={this.state.tagSuggestions} onSelect={this.addTag.bind(this)}/>

				<br/><br/>

				<UserResults tags={this.state.tags} />

				<hr/>

				<UserResults tags={['cisco']} canInviteAll={true} title="Invite Cisco followers to follow your product"/>

				<button type='button' className="btn btn-sm btn-warning btn-nav btn-next pull-right">Next ></button>
			</div>
		)
	}
}

class SearchBySelect extends Component{
	
	setSearchBy(searchBy){
		this.props.onChange(searchBy);
	}

	isActive(searchBy){
		return (searchBy === this.props.active) ? 'active':'';
	}

	radioActionBtns(){
		return this.props.buttons.map((searchBy, index) => {
			return (
				<label className={`btn btn-default btn-sm btn-search-by text-capitalize ${this.isActive(searchBy)}`} key={searchBy} onClick={()=>this.setSearchBy(searchBy)}>
					<input type="radio" defaultChecked={this.isActive(searchBy)} />
					{searchBy}
				</label>
			)
		})
	}

	render(){
		return (
			<div className="row container-fluid">
				<label>Search by: </label>
				<div className="btn-group search-by-group" role='group' data-toggle='buttons'>
					{this.radioActionBtns()}
				</div>
			</div>
		)
	}
}

class TagsList extends Component{
	render(){
		return (
			<div className="panel panel-default tag-list">
				<div className="panel-body">
					{this.props.tags.map(tag=><div className="tag tag-select-item" key={tag} onClick={()=>{this.props.onSelect(tag)}}>{tag}</div>)}
				</div>
			</div>
		)
	}	
}

class UserResults extends TrackerReact(Component){

	constructor(){
		super();
		this.state = {
			allClicked: false
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

	showInviteAll(){
		if(this.props.canInviteAll)
			return (
				<InviteAllButton usernames={this.usersWithTags().map(user=>user.username)} onClicked={this.allClicked.bind(this)}/>
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
			        <InviteButton username={user.username} allClicked={this.state.allClicked} />
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

class InviteButton extends Component{
	constructor(){
		super();
		this.state = {
			sent: false
		}
	}

	inviteUser(){
		if(this.state.sent === false){
			this.setState({sent: true});
			Meteor.call('inviteUser', this.props.username, (error, response)=>{
				if(error){
					this.setState({sent: false});
				}else{
					console.log(response);
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

class InviteAllButton extends InviteButton{
	
	inviteUsers(){
		if(this.state.sent === false){
			this.setState({sent: true});
			this.props.onClicked();
			Meteor.call('inviteUsers', this.props.usernames, (error, response)=>{
				if(error){
					this.setState({sent: false});
				}else{
					console.log(response);
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