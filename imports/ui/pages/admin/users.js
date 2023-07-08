import './users.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
Template.users.onCreated(function () {
    this.autorun(() => {
        this.subscribe('get.Users');
    });
    
});

Template.users.helpers({
    getUsers: function () {
        const users = Meteor.users.find({$or:[{_id:Meteor.userId(),'profile.role':'CEO'},{'profile.role':'User'}]}).fetch();
        users.map((user, index) => {
            user.index = index + 1;
        });
        return users;
    },
});

Template.users.events({
    'click .removeUser': function (event, template) {
        if (confirm('Əminsiniz?') === true) {
            let query = {
                _id: this._id
            }
            Meteor.call('delete.User', query, function (error) {
                if (error) {
                    alert(error)
                }
            })
        }
    }
});