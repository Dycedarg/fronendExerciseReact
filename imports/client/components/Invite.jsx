import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Profiles, tags as tagResults } from '../../api/collections.js';
import SearchBySelect from './SearchBySelect';
import UserResults from './UserResults';

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



