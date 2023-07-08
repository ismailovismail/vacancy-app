import './navigation.html'
import {FlowRouter} from 'meteor/ostrio:flow-router-extra'


Template.navigation.helpers({
    getCurrentUser: function() {
        return Meteor.user()
    },
    getRole(){
        return Meteor.user()?.profile?.role === 'CEO'
    }
});

Template.navigation.events({ 
    'click .logoutBtn': function(event, template) { 
         if (confirm('Are you sure?') === true) {
            Meteor.logout(function(error){
                if (error) {
                    console.log(error);
                }else{
                    FlowRouter.go('/login')
                }
            })
         }
    } 
});