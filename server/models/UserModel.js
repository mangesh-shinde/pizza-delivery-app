const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },

    cart: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Menu"
                }, 
            itemQty: {
                type: Number,
                required: true,
                default: 1
                }
        } 
    ]

})

UserSchema.pre('save', function(next){
    if(!this.isModified('password')){
        return next()
    }

    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
        if(err){
            return next(err)
        }
        this.password = hashedPassword
        next()
    })

})

module.exports = mongoose.model('User', UserSchema)
