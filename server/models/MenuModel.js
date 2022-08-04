const mongoose = require('mongoose')
const MenuModel = new mongoose.Schema({

    pizzaName: {
        type: String,
        required: true
    },

    pizzaSize: {
        type: String,
        required: true
    },

    pizzaPrice: {
        type: Number,
        required: true
    },

    pizzaImg: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Menu', MenuModel)