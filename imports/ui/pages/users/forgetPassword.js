import './forgetPassword.html'

Template.forgetPassword.events({
    'submit #forgetPwForm': function (event, template) {
        event.preventDefault()
        let email = event.target.email.value
        if (!email) {
            return alert('Fill in the blank')
        }
        console.log(email);
        Accounts.forgotPassword({ email: email }, function (error) {
            if (!error) {
                alert('Successfully email send')
            } else {
                alert(error)
            }
        });
    }
});