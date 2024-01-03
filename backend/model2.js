import mongoose from 'mongoose'

const TranData = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    ref: {
        type: String,
        require: true
    }

})

export  default mongoose.model('transactions',TranData);