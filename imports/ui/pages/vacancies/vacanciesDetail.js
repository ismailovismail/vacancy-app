import { AppliedVacancies } from '../../../api/appliedVacancies/collections';
import { Vacancies } from '../../../api/vacancies/collections';
import './vacanciesDetail.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { Random } from 'meteor/random'

Template.vacanciesDetail.onCreated(function () {
    this.vacancyId = new ReactiveVar(FlowRouter.getParam('_id'))
    this.autorun(() => {
        let query = {
            _id: this.vacancyId.get()
        }
        this.subscribe('get.Vacancies', query);
    });
});


Template.vacanciesDetail.helpers({
    getVacancy: function () {
        let query = {
            _id: Template.instance().vacancyId.get()
        }
        return Vacancies.findOne(query)
    },
    getDate:function(){
        let query = {
            _id:Template.instance().vacancyId.get()
        }
        const date = new Date(Vacancies?.findOne(query)?.lastdate).toLocaleDateString()
        return date

    },
    getDemandsLength(){
        return Vacancies?.findOne({ _id: Template.instance().vacancyId.get() })?.demands.length === 0
    },
});


Template.vacanciesDetail.events({
    'click .applyBtn': function (event, template) {
        let data = { ...this, _id: Random.id(), vacancyId: this?._id, userId: Meteor?.userId() }
        let alreaydApplied = AppliedVacancies.findOne({ userId: Meteor.userId(), vacancyId: this._id })
        if(alreaydApplied) {
            
            return alert('Artıq vakansiyaya müraciət olunub')
        }
        if (Meteor.user()?.profile?.cvFileId) {

            Meteor.call('add.ApplyVacancy', data, this, function (error, success) {
                if (error) {
                    alert(error)
                } else {
                    alert('Müraciət uğurlu oldu')
                    FlowRouter.go('/applied-vacancies')
                }
            })
        } else {
            alert('Ilk öncə cv-nizi yükləyin')
            FlowRouter.go('/user-profile')
        }
    }
});