import { Meteor } from 'meteor/meteor'
import { Users_Files } from './collections';

Meteor.publishComposite("get.Users", function (query = {}) {
    return {
        find() {
            return Meteor.users?.find(query);
        },
        children:[{
            find(user){
                if (user._id) {
                    return Users_Files.find({'meta.userId':user._id}).cursor
                }
            }
        }]
    }
});