const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, required: true },
    description: { type: String, maxLength: 600 },
    level: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    slug: { type: String, slug: 'name', unique: true },
}, {
    timestamps: true,
},);

// Custom query helpers
Course.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type);

        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',  
        })
    }
    return this;
}

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);