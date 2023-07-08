import './addVacancy.html'
import { Random } from 'meteor/random'
import { vacancyValidationContext } from '../../../api/vacancies/collections';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

Template.addVacancy.onCreated(function () {
    this.demands = new ReactiveVar([])
});


Template.addVacancy.helpers({
    getDemandCounts: function () {
        let demandCounts = Template.instance().demands.get()
        return demandCounts.length
    },
    getDemands: function () {
        let demands = Template.instance().demands.get()
        if (demands.length) {
            return [...demands]
        }
    }
});


Template.addVacancy.events({
    'click .demandBtn': function (event, template) {
        event.preventDefault()
        let demandValue = $('#demands').val()
        if (demandValue) {
            let demands = template.demands.get();
            template.demands.set([...demands, demandValue])
            document.getElementById('demands').value = ''
        } else {
            alert('Fill in the blank')
        }
    },
    'submit #addVacancy': function (event, template) {
        event.preventDefault()
        let name = $('.name').val();
        let companyname = $('.companyname').val();
        let address = $('.address').val();
        let email = $('.email').val();
        let phone = $('.phone').val();
        let lastdate = $('.lastdate').val()
        let demands = template.demands.get()
        let data = {
            _id: Random.id(),
            name,
            companyname,
            address,
            email,
            phone,
            lastdate,
            demands,
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

        Meteor.call('add.Vacancy', data, function (error) {
            if (error) {
                alert(error)
            } else {
                alert('Vakansiya uğurla əlavə edildi')
                FlowRouter.go('/admin/vacancies')

            }
        })

    }
});