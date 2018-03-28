import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor';

export const Projects = new Mongo.Collection('projects');
SimpleSchema.extendOptions(['autoform']);
Projects.schema = new SimpleSchema({
    name: {
        type: String,
        label: "Nombre del proyecto",
        max: 200
    },
    owner: {
        type: String,
        label: "Propietario",
        autoValue(){
            return this.userId
        },
        autoform:{
            type: "hidden"
        }
    },
    create: {
        type: Date,
        autoValue(){
            return new Date()
        },
        autoform:{
            type:"hidden"
        }
    },
    summary: {
        type: String,
        label: "Detalle del proyecto",
        optional: true,
        max: 1000
      }
});

Projects.attachSchema(Projects.schema);

Projects.allow({
    insert: function(userId, doc){
        return doc.owner === userId;
    }
})

Meteor.methods({
    'projects.remove'(projectId){
        check(projectId, String);
        Projects.remove(projectId);
    }
})