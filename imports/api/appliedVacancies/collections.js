import SimpleSchema from "simpl-schema";

export const AppliedVacancies = new Mongo.Collection('applied-vacancies')

const Schema = {};

Schema.AppliedVacancy = new SimpleSchema({
    name: {
        type: String,
        required: true
    },
    vacancyId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        regEx: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
        type: Number,
        required: true
    },
    lastdate: {
        type: String,
        required: true
    },
    demands:{
        type:Array,
        optional:true
    },
    'demands.$':{
        type:String,
        required:true
    },
    creator:{
        type:String,
        required:true
    },
    status: {
        type: String,
        defaultValue: 'Gözləyir',
        optional: true
    }

})

export const appliedVacancyValidationContext = Schema.AppliedVacancy.namedContext('todo')

AppliedVacancies.attachSchema(Schema.AppliedVacancy)