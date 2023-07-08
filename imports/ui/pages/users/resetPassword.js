import './resetPassword.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
Template.resetPassword.events({
    'submit #resetForm': function (event, template) {
        event.preventDefault()
        let password = $('#resetNewPassword').val()
        let confirmPassword = $('#resetConfirmPassword').val()
        let token = FlowRouter.getParam('_link')
        if (!password || !confirmPassword) {
            return alert('Fill in the blanks')
        }
        if (password === confirmPassword) {

            Accounts.resetPassword(token, password, function (error,success) {
                if (error) {
                    alert(error)
                } else {
                    alert('Successfully reset password')
                    FlowRouter.go('/login')
                }
            })
        } else {
            alert('Passwords are not the same')
        }
    }
});