import { Users_Files } from "../users/collections";
import { AppliedVacancies } from "./collections";

Meteor.publishComposite("get.AppliedVacancies", function (query = {}) {
    return {
        find() {
            return AppliedVacancies?.find(query);
        },
        children: [
            {
                find(vacancy) {
                    if (vacancy) {
                        return Users_Files?.find({ 'meta.userId': vacancy.userId })?.cursor
                    }
                }
            },
            {

                find(vacancy) {
                    if (vacancy) {
                        return Meteor.users?.find({ _id: vacancy.userId })
                    }
                },

            },

        ],

    }
});