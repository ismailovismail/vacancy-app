import SimpleSchema from 'simpl-schema';

export const Vacancies = new Mongo.Collection('vacancies')

const Schema = {};

Schema.Vacancy = new SimpleSchema({
    name: {
        type: String,
        required: true,
        regEx: /^[A-Za-z\s]+$/
    },
    companyname: {
        type: String,
        required: true,
        regEx: /^[A-Za-z\s]+$/
    },
    address: {
        type: String,
        required: true,
        regEx: /^[A-Za-z\s]+$/
    },
    email: {
        type: String,
        required: true,
        regEx: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
        type: Number,
        required: true,
        regEx: /^\d+$/
    },
    lastdate: {
        type: Date,
        required: true,
        regEx: /^\d{4}-\d{2}-\d{2}$/
    },
    demands:{
        type:Array,
        optional:true
    },
    'demands.$':{
        type:String,
        required:true
    },
    creator: {
        type: String,
        required: true
    }

})

export const vacancyValidationContext = Schema.Vacancy.namedContext('vacancy')

Vacancies.attachSchema(Schema.Vacancy)