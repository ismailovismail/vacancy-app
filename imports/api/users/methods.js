import { Users_Files } from "./collections"

Meteor.methods({
    'addUser': function (data) {
        let result = Accounts.createUser({
            username: data.username,
            password: data.password,
            email: data.email,
            profile: {
                firstname: data.firstname,
                lastname: data.lastname,
                role: data.role
            }
        })
        return result
    },
    'edit.User': function (data, query = {}) {
       return Meteor.users.update({ _id: query._id }, {
            $set: {
                username: data.userName,
                'emails.0.address': data.email,
                'profile.firstname': data.firstName,
                'profile.lastname': data.lastName,
                'profile.role': data.role
            }
        })
    },
    'edit.userProfile': function (data, query = {}) {
        query._id = Meteor.userId()
        if (data.cvFileId && data.previousCvFile) {
            Users_Files.remove({ _id: data.previousCvFile })
        }
        return Meteor.users.update(query, {
            $set: {
                username: data.username,
                'emails.0.address':data.email,
                'profile.firstname':data.firstname,
                'profile.lastname':data.lastname,
                'profile.cvFileId':data.cvFileId
            }
        })
    },
    'delete.User': function (query = {}) {
        return Meteor.users.remove(query)
    }
})