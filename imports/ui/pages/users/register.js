import './register.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'


Template.register.events({
    'submit #registerForm': function (event, template) {
        event.preventDefault()

        let username = $('#registerUsername').val();
        let email = $('#registerEmail').val();
        let password = $('#registerPassword').val();
        let firstname = $('#registerFirstName').val();
        let lastname = $('#registerLastName').val();


        if (!username || !email || !password || !firstname || !lastname) {
            return alert('Fill in the blanks')
        }

        let data = {
            username,
            email,
            password,
            firstname,
            lastname,
            role: 'User'

        }
        Meteor.call('addUser', data, function (error, success) {
            if (error) {
                alert(error)
            } else {
                alert('Successfully registration')
                FlowRouter.go('/login')


            }
        })
    }
});