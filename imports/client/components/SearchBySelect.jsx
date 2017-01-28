import React, { Component } from 'react';

export default class SearchBySelect extends Component{
	
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