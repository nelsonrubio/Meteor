import { Meteor } from 'meteor/meteor';


Template.projects.events({ 
    'click .remove': function(event, template) { 
         Meteor.call('projects.remove', this._id)
    } 
}); 
