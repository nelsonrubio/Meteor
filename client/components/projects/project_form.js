import { Projects } from '../../../lib/collections/projects'
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { AutoForm } from 'meteor/aldeed:autoform';

Template.projectForm.helpers({
    formCollection(){
        return Projects;
    }
})

Template.projectForm.onCreated(function(){
    AutoForm.addHooks(['projectForm'], {
        onSuccess: function(operation, result, template){
            Router.go('/projects');
        }
    });
})