import { Meteor } from 'meteor/meteor';
import { Projects } from '../lib/collections/projects';

Meteor.publish('projects', function projectsPublications(){
    return Projects.find({owner: this.userId});
});