import './usersEdit.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

Template.usersEdit.onCreated(function () {
    this.role = new ReactiveVar('CEO')
    this.userEditId = new ReactiveVar(FlowRouter.getParam('_id'))
    this.autorun(() => {
        let query = {
            _id: this.userEditId.get()
        }
        this.subscribe('get.Users', query);
    });
});

Template.usersEdit.helpers({
    getUser: function () {
        let query = {
            _id: Template.instance().userEditId.get()
        }
        return Meteor.users.findOne(query)
    },
    equalsValue: function (value) {
        let query = {
            _id: Template.instance().userEditId.get()
        }
        return Meteor.users?.findOne(query)?.profile?.role === value
    }
});

Template.usersEdit.events({
    'change #roleSelect': function (event, template) {
        let selectValue = event.target.value;
        template.role.set(selectValue)
    }
    ,
    'submit #userEdit': function (event, template) {
        event.preventDefault()
        let firstName = $('.firstName').val()
        let lastName = $('.lastName').val()
        let userName = $('.userName').val()
        let email = $('.email').val()
        let role = template.role.get()

        let data = {
            firstName,
            lastName,
            userName,
            email,
            role,
        }

        let query = {
            _id:template.userEditId.get()
        }

       
        Meteor.call('edit.User', data, query, function (error) {
            if (error) {
                alert(error)
            } else {
                alert('Redaktə olundu')
                FlowRouter.go('/admin/users')
            }
        })


    }
});