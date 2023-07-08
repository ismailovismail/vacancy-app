import { AppliedVacancies } from '../../../api/appliedVacancies/collections';
import './adminAppliedVacancies.html'

Template.adminAppliedVacancies.onCreated(function () {
    this.autorun(() => {
        this.subscribe('get.AppliedVacancies');
    });
});


Template.adminAppliedVacancies.helpers({
    getAppliedVacancies: function () {
        const appliedVacancies = AppliedVacancies.find({creator:Meteor.userId()}).fetch()
        appliedVacancies.map((vacancy, index) => {
            vacancy.index = index + 1
        })
        return appliedVacancies
    },
    getUser: function (data) {
        return Meteor.users?.findOne({ _id:data.userId })?.profile?.firstname
    },
    
});

Template.adminAppliedVacancies.events({ 
    'click .removeVacancy': function(event, template) {
          let query = {
            _id:this._id
          } 
          Meteor.call('delete.AppVacancy',query,function(error){
                 if (error) {
                    alert(error)
                 }else{
                    alert('Müraciət uğurla silindi')
                 }
          })
    }  
});

