import React, { Component } from 'react';
import Invite from './Invite';

export default class App extends Component {

	constructor(){
		super();
		this.actions = ['invite','share','education'];
		this.state = {
			action: 'invite'
		}
	}

	onChangeAction(action){
		this.setState({action});		
	}

	currentActionComponent(action){
		const components = {
			invite(){return <Invite />},
			share(){return <Share />},
			education(){return <Education />}
		}

		return components[action]();
	}

	render(){
		return (
			<div className="container-fluid">
				<br/>
				<div className="panel panel-default action-panel col col-md-7 col-sm-7 col-xs-7">
					<div className="panel-body text-center">
						<ActionNav active={this.state.action} buttons={this.actions} onChange={this.onChangeAction.bind(this)}/>
					</div>
					{this.currentActionComponent(this.state.action)}	
				</div>
			</div>
		)
	}
}

class ActionNav extends Component {

	setCurrentAction(action){
		this.props.onChange(action)
	}
	
	isActive(action){
		return (action === this.props.active) ? 'active':'';
	}

	radioActionBtns(){
		return this.props.buttons.map((action, index) => {
			return (
				<label className={`btn btn-default btn-product-action text-capitalize ${this.isActive(action)}`} key={action} onClick={()=>this.setCurrentAction(action)}>
					<input type="radio" defaultChecked={this.isActive(action)}/>
					{++index}. {action}
				</label>
			)
		})
	}

	render(){
		return (
			<div className="btn-group" role='group' data-toggle='buttons'>
				{this.radioActionBtns()}
			</div>
		)
	}
}

class Share extends Component{
	render(){return(<div></div>);}
}

class Education extends Component{
	render(){return(<div></div>);}
}