import { Vacancies } from '../../../api/vacancies/collections';
import './vacancies.html'

Template.home.onCreated(function () {
    this.autorun(() => {
        this.subscribe('get.Vacancies');
    });
    this.vacancies = new ReactiveVar(Vacancies?.find({},{sort:{lastdate:1}}))

});


Template.home.helpers({
    getVacancies: function () {
        const vacancies = Template.instance().vacancies.get().fetch()
        vacancies.map((item, index) => {
            item.index = index + 1
        })
        return vacancies
    }
});


Template.home.events({
    'input #searchInp': function (event, template) {
        const inputValue = event.target.value
        console.log(inputValue);
        const searchVacancies = Vacancies?.find({ name: { $regex: inputValue, $options: 'i' } })
        template.vacancies.set(searchVacancies)

    },
    'change #selectDate': function (event, template) {
        let value = event.target.value
        if (value === '-1') {
            template.vacancies.set(Vacancies?.find({}, { sort: { lastdate: -1 } }))
        } else if (value === '1') {
            template.vacancies.set(Vacancies?.find({}, { sort: { lastdate: 1 } }))
        }
    }
});