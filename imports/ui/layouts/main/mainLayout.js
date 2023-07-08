import './mainLayout.html'
import {FlowRouter} from 'meteor/ostrio:flow-router-extra'
Template.mainLayout.onCreated(function() { 
     this.autorun(()=>{
        if (!Meteor.userId()) {
            FlowRouter.go('/login')
        }
     })
});