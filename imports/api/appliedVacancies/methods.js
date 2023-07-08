import { AppliedVacancies } from "./collections"

Meteor.methods({
    'add.ApplyVacancy': function (data,vacancy) {

        const appliedVacancy = AppliedVacancies.findOne({ userId: Meteor.userId(), vacancyId: vacancy._id })
        if (appliedVacancy) {
            return 
        }
       return AppliedVacancies.insert(data)
    },
    'edit.Status': function (data, query = {}) {
       return AppliedVacancies.update(query, {
            $set: {
                status: data.status
            }
        },
            function (error) {
                if (error) {
                    console.log(error);
                }
            }
        )
    },
    'delete.AppVacancy': function (query = {}) {
       return AppliedVacancies.remove(query)
    }
})