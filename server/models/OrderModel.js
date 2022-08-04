const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    orderItems: [
        {
            pizzaName: String,
            pizzaQty: Number
        }
    ],
    orderStatus: {
        type: String,
        required: true,
        default: "Placed"
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentType:{
        type: String,
        default: "Cash"
    },
    orderedAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', orderSchema)