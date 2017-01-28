import React, { Component } from 'react';

export default class ErrorAlert extends Component{
	render(){
		if(this.props.show)
			return (
				<div className="alert alert-danger">
					There was a problem delivering your invitation(s).  Please try again.
				</div>
			)
		else return (<div></div>)
	}
}