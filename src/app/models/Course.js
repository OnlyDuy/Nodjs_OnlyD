
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    name: {type: 'string', maxLength: 255},
    description: {type: 'string', maxLength: 600},
    image: {type: 'string', maxLength: 255},
    createdAt: {type: Date, default: Date.now},
    upadteAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Course', Course);