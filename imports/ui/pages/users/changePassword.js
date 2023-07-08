import './changePassword.html'

Template.changePassword.events({
    'submit #changePwForm': function (event, template) {
        event.preventDefault()
        let oldPassword = $('.old-pw').val()
        let newPassword = $('.new-pw').val()
        Accounts.changePassword(oldPassword, newPassword, function (error) {
            if (error) {
                alert(error)
            } else {
                alert('Parol dəyişdirildi')
                document.getElementsByClassName('old-pw').value = ''
                document.getElementsByClassName('new-pw').value = ''
            }
        })

    }
});