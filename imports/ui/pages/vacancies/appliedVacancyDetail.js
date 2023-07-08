import { AppliedVacancies } from '../../../api/appliedVacancies/collections';
import './appliedVacancyDetail.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

Template.appliedVacancyDetail.onCreated(function() { 
    this.vacancyId = new ReactiveVar(FlowRouter.getParam('vacancyId'))
     this.autorun(()=>{
        let query = {
            vacancyId:this.vacancyId.get(),
            userId:Meteor.userId()
        }
        this.subscribe('get.AppliedVacancies', query);    
     })
});


Template.appliedVacancyDetail.helpers({
    getAppliedVacancy: function() {
        let query = {
            vacancyId:Template.instance().vacancyId.get(),
            userId:Meteor.userId()
        }
        return AppliedVacancies.findOne(query)
    },
    getDate:function(){
        let query = {
            vacancyId:Template.instance().vacancyId.get(),
            userId:Meteor.userId()
        }
        const date = new Date(AppliedVacancies?.findOne(query)?.lastdate).toLocaleDateString()
        return date
    }
    
});

Template.appliedVacancyDetail.events({ 
    'click .removeBtn': function(event, template) {
        let query = {
            _id:this._id
        } 
        if (confirm('Əminsiniz?')) {
            Meteor.call('delete.AppVacancy',query,function(error){
                if (error) {
                 alert(error)
                }else{
                 alert('Müraciət ləğv edildi')
                 FlowRouter.go('/applied-vacancies')
                }
          })
        }
    } 
});