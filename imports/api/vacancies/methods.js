import { Vacancies } from "./collections"

Meteor.methods({
    'add.Vacancy': function (data) {
        return Vacancies.insert({
            name: data.name,
            companyname: data.companyname,
            address: data.address,
            email: data.email,
            phone: data.phone,
            lastdate: data.lastdate,
            demands: data.demands,
            creator: Meteor.userId()
        })
    },
    'edit.Vacancy': function (query = {}, data) {

        return Vacancies.update({ _id: query._id }, {
            $set: {
                name: data.name,
                companyname: data.companyname,
                address: data.address,
                email: data.email,
                phone: data.phone,
                lastdate: data.lastdate,
                creator: data.creator
            }
        })

    },
    'delete.Demand': function (value) {
        return Vacancies?.update({}, { $pull: { demands: { $eq: value } } }, { multi: true });
    },
    'update.Demand': function (query = {}, demandValue) {
        return Vacancies?.update(query, { $push: { demands: demandValue } })
    },
    'delete.Vacancy': function (query = {}) {
        return Vacancies.remove(query)
    }
})