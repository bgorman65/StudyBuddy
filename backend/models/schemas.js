// File to define the schemas for the database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    entryDate: {type: Date, default: Date.now}
});

const lofSchema = new Schema({
    username: {type: String, required: true},
    interval: {type: Number, required: true},
    count: {type: Number, required: true},
    entryDate: {type: Date, default: Date.now}
});

const Users = mongoose.model('Users', userSchema, 'users');
const Logs = mongoose.model('Logs', lofSchema, 'logs');
const mySchemas = {'Users':Users, 'Logs':Logs};

module.exports = mySchemas;