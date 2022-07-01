const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date : {
        type: Date,
        require: true,
        default: Date.now()
    },
    creator : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
    
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Event', eventSchema);