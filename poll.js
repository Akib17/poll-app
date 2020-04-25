const { Schema, model } = require('mongoose')

const pollSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    totalVote: {
        type: Number,
        defaultValue: 0
    },
    options: {
        type: [{
            name: String,
            vote: Number
        }]
    }
})

const poll = model('Poll', pollSchema)

module.exports = poll