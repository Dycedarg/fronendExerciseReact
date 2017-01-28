import { Meteor } from 'meteor/meteor';
import { Profiles } from '../imports/api/collections.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('profiles', ()=>{
	return Profiles.find();
})

Meteor.methods({
	inviteUser(){
		return 'success';
	},
	inviteUsers(){
		return 'success';
	}
})
