import { Users_Files } from '../../../api/users/collections';
import { Random } from 'meteor/random'
import './userProfile.html'

Template.userProfile.onCreated(function () {
    this.isLoading = new ReactiveVar(false)
    this.autorun(() => {
        let query = {
            _id: Meteor.userId()
        }
        this.subscribe('get.Users', query);

    });
});

Template.userProfile.helpers({
    getCvFile: function (data) {
        return Users_Files?.findOne({ 'meta.userId': data?._id })?.link();
    }
});

Template.userProfile.events({
    'submit #userEdit': function (event, template) {
        event.preventDefault()
        let firstName = $('#firstName').val();
        let lastName = $('#lastName').val();
        let userName = $('#userName').val();
        let email = $('#email').val();
        let file = document.getElementById('cvFile').files[0];

        let data = {
            username: userName,
            email: email,
            firstname: firstName,
            lastname: lastName,
        }

        let query = {
            _id: Meteor.userId()
        }

        if (file) {
            const upload = Users_Files.insert({
                fileId: Random.id(),
                meta: {
                    temp: true,
                    userId: query._id
                },
                file,
                chunkSize: 'dynamic'
            }, false);

            upload.on('start', function () {
                template.isLoading.set(true)
            })

            upload.on('end', function (error, fileObj) {
                if (error) {
                    alert(error)
                } else {
                    data.cvFileId = fileObj._id;
                    data.previousCvFile = Meteor.user()?.profile?.cvFileId
                    Meteor.call('edit.userProfile', data, function (error) {
                        if (error) {
                            alert(error)
                        } else {
                            alert('Dəyişikliklər yadda saxlanıldı')
                        }
                    })
                }
                template.isLoading.set(false)
            })

            upload.start()

        } else {
            Meteor.call('edit.userProfile', data, function (error) {
                if (error) {
                    alert(error)
                } else {
                    alert('Successfully saved user')
                }
            })
        }
    }
});