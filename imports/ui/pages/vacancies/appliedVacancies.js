import { AppliedVacancies } from '../../../api/appliedVacancies/collections';
import './appliedVacancies.html'

Template.appliedVacancies.onCreated(function () {
    this.autorun(() => {
        let query = {
            userId: Meteor?.userId()
        }
        this.subscribe('get.AppliedVacancies', query);
    });
});

Template.appliedVacancies.helpers({
    getAppliedVacancies: function () {
        let query = {
            userId: Meteor?.userId()
        }
        const appliedVacancies = AppliedVacancies?.find(query).fetch()
        appliedVacancies.map((vacancy, index) => {
            vacancy.index = index + 1
        })
        return appliedVacancies
    },
    getAppliedVacanciesEmpty() {
        let query = {
            userId: Meteor.userId()
        }
        return AppliedVacancies.find(query).fetch().length === 0
    }
});