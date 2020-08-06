const mongoose = require('mongoose')

const{Schema} = mongoose;



// *Title
// *Start Date
// *End Date - DateTime
// *Rating - Scale of 1 - 10
// *Image -
// *Latitude - Number
// *Longitude - Number
// *Things done - Text
// *New Food tried - Text
// *Created At - DateTime
// *Updated At - DateTime


const requiredNumber = {
    type: Number,
    required: true,
};

const defaultRequiredDate = {
    type: Date,
    default: Date.now,
    required: true,
};

const logEntrySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    Visited: Boolean,
    description: String,
    comments: String,
    newFood: String,
    image: String,
    toVisit: String,
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    longitude: {
        ...requiredNumber,
        min: -180,
        max: 180,
    },
    latitude: {
        ...requiredNumber,
        min: -90,
        max: 90,
    },
    visitDate:{
        // required: true,
        type: Date,
    },
    },{
        timestamps: true,
    }
);


const logEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = logEntry;