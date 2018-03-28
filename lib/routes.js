import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';
import { Projects } from '../lib/collections/projects';

Router.onBeforeAction(function(){
    if(! Meteor.userId()){
        Router.go('home');
        this.next();
    }
    else{
        if(Router.current().route.getName() === 'home'){
            Router.go('projects');
        }
        this.next();
    }
})

Router.configure({
    layoutTemplate : 'baseLayout',
    waitOn: function(){
        return Meteor.subscribe('projects');
    }
})

Router.route('/', {
    name: 'home'
})

Router.route('/projects',{
    name: 'projects', 
    data: {
        projects(){
            return Projects.find()
        }
    }
})

Router.route('/project_form', {
    name: 'project_form'
})

Router.route('/project/:_id', function(){
    let project = Projects.findOne({_id: this.params._id});
    if(! project){
        Router.go('projects');
    }
    else{
        this.render('project_detail',{
            data:{
                project: project
            }
        })
    }

},{
    name: 'project_detail'
})

Router.route('profile',{
    name:'profile',
    data:{
        user(){
            if(Meteor.user()){
                return{
                    id: Meteor.user()._id,
                    email: Meteor.user().emails[0].address
                }
            }
        }
    }
})
