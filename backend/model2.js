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
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    Ref: {
        type: String,
        require: true
    }

})

export  default mongoose.model('transactions',TranData);