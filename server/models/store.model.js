const mongoose = require('mongoose');


const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        unique: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    image:String
});
const Store = mongoose.model('store', storeSchema);

module.exports = Store;