import { Vacancies } from '../../../api/vacancies/collections';
import './editVacancy.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { vacancyValidationContext } from '../../../api/vacancies/collections';


Template.editVacancy.onCreated(function () {
    this.demands = new ReactiveVar([])
    this.vacancyId = new ReactiveVar(FlowRouter.getParam('_id'))
    this.autorun(() => {
        let query = {
            _id: this.vacancyId.get()
        }
        this.subscribe('get.Vacancies', query);
        
    });

});

Template.editVacancy.helpers({
    getVacancy: function () {
        let query = {
            _id: Template.instance().vacancyId.get()
        }
        return Vacancies.findOne(query)
    },
    getDemands: function () {
        return Vacancies?.findOne({ _id: Template.instance().vacancyId.get() })?.demands
    },
    getDemandsLength(){
        return Vacancies?.findOne({ _id: Template.instance().vacancyId.get() })?.demands.length === 0
    },
    getDemand: function (data) {
        const existDemand = Vacancies?.findOne({ _id: Template.instance().vacancyId.get() })
        return existDemand?.demands?.includes(data)
    },
    getDate:function(){
        const date = new Date(Vacancies?.findOne({ _id: Template.instance().vacancyId.get() })?.lastdate).toLocaleDateString()
        return date

    }


});

Template.editVacancy.events({
    'click .demandBtn': function (event, template) {
        event.preventDefault()
        let demandValue = $('#demands').val()
        if (demandValue) {
            let demands = template.demands.get();
            template.demands.set([...demands, demandValue])
            let query = {
                _id:template.vacancyId.get()
            }
                Meteor.call('update.Demand',query,demandValue,function(error,success){
                     if (error) {
                        alert(error)
                     }else{
                        alert('Tələb əlavə edildi')
                     }
                })
            document.getElementById('demands').value = ''
        } else {
            alert('Fill in the blank')
        }
    },
    'submit #editVacancy': function (event, template) {
        event.preventDefault()

        let name = $('.name').val();
        let companyname = $('.companyname').val();
        let address = $('.address').val();
        let email = $('.email').val();
        let phone = $('.phone').val();
        let lastdate = $('.lastdate').val()
        let query = {
            _id: template.vacancyId.get()
        }

        let data = {
            name,
            companyname,
            address,
            email,
            phone,
            lastdate,
            creator: Meteor.userId()
        }

        vacancyValidationContext.reset()
        data = vacancyValidationContext.clean(data)
        vacancyValidationContext.validate(data)

        $('input').removeClass('is-invalid')

        if (!vacancyValidationContext.isValid()) {
            vacancyValidationContext.validationErrors().map((err) => {
                $(`#${err.name}`).addClass('is-invalid')
                $(`.feedback-${err.name}`).text(`Error: ${err.type}`)
            })
            return
        }


    
            Meteor.call('edit.Vacancy', query, data, function (error) {
                if (error) {
                    alert(error)
                } else {
                    alert('Redaktə edildi')
                    FlowRouter.go('/admin/vacancies')

                }
            })
        

    },
    'click .deleteBtn': function (event, template) {
        event.preventDefault()
        let value = this.substring(0, this.length);

        Meteor.call('delete.Demand', value, function (error, success) {
            if (error) {
                alert(error)
            } else {
                alert('Silindi')
            }
        })

    }
});