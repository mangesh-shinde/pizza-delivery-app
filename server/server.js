const dotenv = require('dotenv')
dotenv.config()

//Express import
const express = require('express');
const app = express()

//Model imports here
const User = require("./models/UserModel")
const Menu = require("./models/MenuModel")
const Order = require("./models/OrderModel")

//Middleware imports here
const AuthMiddleware = require('./middlewares/Auth')
const AdminAuth = require("./middlewares/AdminAuth")

//Third party package imports here
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')


const PORT = process.env.PORT || 5000 ;
require('./db/conn')

//Using Middlewares
app.use(express.json()) 
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

//All routes goes here
app.get('/', (req, res) => {
    console.log(`Cookies: ${req.cookies}`)
    res.send("Hello World")
})

app.post('/register', async(req, res) => {

    try{
        const {name, email, mobileNumber, password, confirmPassword} = req.body;
        const isExistingUser = await User.findOne({'email': email});
        if(isExistingUser){
            return res.status(400).json({message: "User already exists !!"})
        }
        
        const user = new User({name, email, mobileNumber, password});
        await user.save()
        res.status(200).json({"message": "User registered successfully!"})

    }catch(e){
        console.log(e.message)
        res.status(500).json({"error": "Something went wrong"})
    }

})

app.post('/login', async(req, res) => {
    try{
        const {email, password } = req.body;
        if( !( email && password)){
            return res.status(400).json({ "error" : "Please provide both email and password" })
        }

        //Check if email exists
        const user = await User.findOne({'email': email});
        if(!user){
            return res.status(400).json({message: "No records found"})
        }
        
        //check if password matches
        const isPasswordMatching = await bcrypt.compare(password, user.password)
        if(!isPasswordMatching){
            return res.status(400).json({message: "Invalid username/password"})
        }
        
        //Create a json web token once credentials are matched
        const accessToken = jwt.sign(
            {
                userId: user._id,
                userEmail: user.email
            }, 
            process.env.SECRET_ACCESS_TOKEN_KEY
            )
            
        //store the access token in browser cookie
            res.cookie('jwt', accessToken, {
                expires: new Date(Date.now() + (2*60*60*1000)),
                httpOnly: true
            } )
            
            res.status(200).json({message: "Logged in !!"})

        }catch(e){
            console.log(e.message)
            res.status(500).json({"error": "Something went wrong"})
        }    
})
        

app.get('/menu', async(req, res) => {
    try{
        const pizzas = await Menu.find({})
        
        if(!pizzas.length){
            return res.status(404).json({"message": "No Data Found"})
        }
        
        res.json({pizzas: pizzas})
        
    }catch(e){
        res.status(500).json({"error": "Something went wrong"})
    }
})

app.post('/menu', async(req, res) => {
    try{
        const {pizzaName, pizzaSize, pizzaPrice, pizzaImg} = req.body;
        const pizzaItem = new Menu({pizzaName, pizzaSize, pizzaPrice, pizzaImg})
        await pizzaItem.save()
        res.status(201).json({ "message" : "Pizza item created successfully!!" })
    }catch(e){
        res.status(500).json({"error": "Something went wrong"})
    }
})

app.post('/addtocart', AuthMiddleware, async(req, res) => {
    try{
        const { pizzaId } = req.body; // pizza to add in user cart
        const userId = req.userId; // since auth middleware executed earlier, we have userId from cookie payload
        
        if(!pizzaId){
            return res.status(400).json({ "error" : "Please specify pizza id" })
        }
        
        if(!userId){
            return res.status(400).json({ "error" : "No user found" })
        }
        
        const user = await User.findById(userId)
        user.cart.push({
            "_id": pizzaId,
            "itemQty" : 1
        })
        
        await user.save()
        res.status(200).json({ "message" : "Pizza added to cart" })

    }catch(e){
        console.log(e.message)
        return res.status(500).json({ "error" : 'Something went wrong'})
    }
})

app.get('/getcart', AuthMiddleware, async(req, res) =>{
    try{
        const userId = req.userId;
        const userDetails = await User.findById(userId).populate("cart._id")
        res.status(200).json({cart: userDetails})
        
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ "error" : 'Something went wrong'})
    }
})

app.post('/incrementqty', AuthMiddleware,  async(req, res) => {
    try{
        const { itemId } = req.body
        const userId = req.userId; // since auth middleware executed earlier, we have userId from cookie payload

        if(!itemId){
            return res.status(400).json({ "error": "Please provide itemId"})
        }

        //check if itemId exists in DB
        const isValidItem = await Menu.findById(itemId)
        if(!isValidItem){
            return res.status(400).json( { "error": "Invalid item" } )
        }

        const user = await User.findById(userId)
        user.cart.forEach(item => {
            if(item._id.toString() === itemId ){
                item.itemQty++
            }
        })
        
        await user.save()

        const userData = {
            _id: user._id,
            cart: user.cart
        }

        res.status(200).json({'cart': userData})

    }catch(e){
        console.log(e.message)
        return res.status(500).json({ "error" : 'Something went wrong'})
    }
})

app.post('/decrementqty', AuthMiddleware, async (req, res) => {
    try{
        const { itemId } = req.body
        const userId = req.userId; // since auth middleware executed earlier, we have userId from cookie payload

        if(!itemId){
            return res.status(400).json({ "error": "Please provide itemId"})
        }

        //check if itemId exists in DB
        const isValidItem = await Menu.findById(itemId)
        if(!isValidItem){
            return res.status(400).json( { "error": "Invalid item" } )
        }

        const user = await User.findById(userId)
        user.cart.forEach(item => {
            if(item._id.toString() === itemId ){
                item.itemQty--
            }
        })
        
        await user.save()

        const userData = {
            _id: user._id,
            cart: user.cart
        }

        res.status(200).json({'cart': userData})

    }catch(e){
        console.log(e.message)
        return res.status(500).json({ "error" : 'Something went wrong'})
    }
})


app.get('/users', AdminAuth, async(req, res) => {
    try{
        const users = await User.find({});
        if(!users.length){
            return res.status(404).json({"message": "No data found"})
        }
        
        const userList = users.map(user => {
            return {
                name: user.name,
                email: user.email
            }
        })

        res.status(200).json({users: userList})
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ "error" : 'Something went wrong'})
    }
})

app.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.status(200).send({"status": "Logged out"})
})

app.post('/deleteitem', AuthMiddleware,  async(req, res) => {
    try{
        const { itemId } = req.body
        if(!itemId){
            return res.status(400).json({ "error": "Please provide Item Id"})
        }

        const userId = req.userId; //identify user for corresponding cart update
        
        const user = await User.findById(userId)
        user.cart = user.cart.filter(item => item._id.toString() !== itemId )
        await user.save()

        res.status(200).json({ "message" : "Item deleted from cart"})
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ "error" : 'Something went wrong'})
    }
    
})

app.get('/getorders', AuthMiddleware,  async (req, res) => {
   try{
       const userId = req.userId; //identify user for corresponding cart update
       const orders = await Order.find({ userId: userId })
       res.status(200).json({"orders": orders})
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ "error" : 'Something went wrong'})
    }
})

app.post('/placeorder', AuthMiddleware, async(req, res) => {
    try{

        console.log("Order: ", req.body.cart)
        console.log("totalAmount: ", req.body.totalAmount)
        
        const cart = req.body.cart
        const totalAmount = req.body.totalAmount
        
        if(!cart.length){
            return res.status(400).json({ "error": "No cart items"})
        }
        
        if(!totalAmount){
            return res.status(400).json({ "error": "Cart Amount is not available"})
        }
        
        const items = cart.map(cartItem => ({
            pizzaName: cartItem._id.pizzaName, 
            pizzaQty: cartItem.itemQty
        }))
        console.log("Items: ", items)
        
        
        const userId = req.userId; //identify user for corresponding cart update
        
        const order = new Order({
            userId: userId,
            orderItems: items,
            orderStatus: "Placed",
            totalAmount: totalAmount,
            paymentType: "Gpay"
        })
        
        await order.save()
        console.log("Order placed !!!")
        
        //Clear cart once order is placed
        const user = await User.findById(userId)
        user.cart=[]
        await user.save()
        console.log("Cleared cart!!")
        res.status(200).json({"status": "OK"})

    }catch(e){
        console.log(e.message)
        return res.status(500).json({ "error" : 'Something went wrong'})
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})