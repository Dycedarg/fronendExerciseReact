export const Profiles = new Meteor.Collection('profiles');
// export const Tags = new Meteor.Collection('tags');

export const tags = (queryString)=>{
	if(queryString.length > 0)
	    return _.uniq(Profiles.find({
	        "profile.following.tags":{
	            $regex: new RegExp(queryString, 'i')
	        }
	    }, {limit: 20}).fetch()
	    .map(doc=>{
	    	return doc.profile.following.tags
	    		.reduce((tags, element)=>
	    			(element.match(queryString) ? (tags.concat(element)):(tags))
	    		,[])
	    })
	    .reduce((tags, array)=>{
			return tags.concat(array);
	    }, []));

	return [];
}