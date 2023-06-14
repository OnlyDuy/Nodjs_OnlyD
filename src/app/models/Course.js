
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: 'string', require: true},
    description: { type: 'string', maxLength: 600},
    image: { type: 'string'},
    videoId: { type: 'string', require: true},
    slug: { type: String, slug: 'name', unique: true},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Course', Course);