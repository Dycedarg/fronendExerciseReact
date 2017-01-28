import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/client/App';

Meteor.startup(()=>{
	Meteor.subscribe('profiles');
	render(<App/>, document.getElementById('render-target'));
})
