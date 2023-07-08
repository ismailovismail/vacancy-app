import { Vacancies } from '../../../api/vacancies/collections';
import './adminVacancies.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
Template.adminVacancies.onCreated(function () {
    this.autorun(() => {
        this.subscribe('get.Vacancies');
    })
    this.autorun(() => {
        if (Meteor.userId() && Meteor.user()?.profile?.role === 'User') {
            FlowRouter.go('/')
        }
    })
});


Template.adminVacancies.helpers({
    getVacancies: function () {
        const vacancies = Vacancies.find({ creator: Meteor.userId() }).fetch();
        vacancies.map((vacancy, index) => {
            vacancy.index = index + 1;
        });
        return vacancies;
    }
});

Template.adminVacancies.events({
    'click .removeVacancy': function (event, template) {
        let query = {
            _id: this._id
        }
        if (confirm('Əminsiniz?') === true) {
            Meteor.call('delete.Vacancy', query, function (error) {
                if (error) {
                    alert(error)
                }
            })
        }
    }
});