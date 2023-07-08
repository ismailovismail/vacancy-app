import { AppliedVacancies } from "../appliedVacancies/collections";
import { Vacancies } from "./collections";

Meteor.publishComposite("get.Vacancies", function (query = {}) {
    return {
        find() {
            return Vacancies.find(query);
        },
        children: [
            {
                find(vacancy) {
                    if (vacancy._id) {
                        return AppliedVacancies.find({ vacancyId: vacancy._id })
                    }
                },
            },
        ]
    }
});