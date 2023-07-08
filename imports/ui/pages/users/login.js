import './login.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
Template.login.events({
    'submit #loginForm': function (event, template) {
        event.preventDefault()
        let username = $('#loginUsername').val();
        let password = $('#loginPassword').val();
        if (!username || !password) {
            return alert('Fill in the blanks')
        }
        Meteor.loginWithPassword(username, password, function (error, success) {
            if (error) {
                alert(error)
            } else {
                FlowRouter.go('/')
            }
        })
    }
});