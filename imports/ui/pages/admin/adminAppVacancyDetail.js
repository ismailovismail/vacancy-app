import { AppliedVacancies } from '../../../api/appliedVacancies/collections';
import { Users_Files } from '../../../api/users/collections';
import './adminAppVacancyDetail.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'


Template.adminAppVacancyDetail.onCreated(function () {
    this.selectValue = new ReactiveVar('Gözləyir')
    this.status = new ReactiveVar(['Gözləyir', 'Qəbul edildi', 'Qəbul edilmədi'])
    this.vacancyId = new ReactiveVar(FlowRouter.getParam('_id'))
    this.autorun(() => {
        let query = {
            _id: this.vacancyId.get()
        }
        this.subscribe('get.AppliedVacancies', query);
    });


});

Template.adminAppVacancyDetail.helpers({
    getDetails: function () {
        return AppliedVacancies.findOne({ _id: Template.instance().vacancyId.get() })
    },
    getUser: function (data) {
        return Meteor.users?.findOne({ _id: data.userId })
    },
    getFile: function (data) {
        return Users_Files?.findOne({ 'meta.userId': data.userId })?.link()
    },
    getStatus() {
        return Template.instance().status.get()
    }
});

Template.adminAppVacancyDetail.events({
    'change .statusSelect': function (event, template) {
        let value = event.target.value
        template.selectValue.set(value)
    },
    'click .updateBtn': function (event, template) {
        console.log(this);
        let query = {
            _id: template.vacancyId.get(),
            userId: this.userId
        }

        let status = template.selectValue.get()

        let data = {
            status: status
        }

        Meteor.call('edit.Status', data, query, function (error) {
            if (error) {
                alert(error)
            } else {
                alert('Status ugurla yenilendi')
            }
        })
    }
});
