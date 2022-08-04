const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
    }]
})

module.exports = mongoose.model('Cart', CartSchema)