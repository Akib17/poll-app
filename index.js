const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const pollController = require('./pollController')

// App init
const app = express()
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// EJS Engine
app.set('view engine', 'ejs')

// Connect with MongoDB Atlas
const password = encodeURIComponent('tcV5YQ9@4Ctmzdj')
const uri = `mongodb+srv://dbUser:${password}@cluster0-yqu97.mongodb.net/AllPolls?retryWrites=true&w=majority`;
mongoose.connect(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});
const conn = mongoose.connection
// Test the connect with database
conn.on('error', err => {
   console.log(err)
})
 
conn.once('open', () => {
   console.log('Connection successful')
})

// @route '/'
// Desc: Home directory
app.get('/', (req, res) => {
    res.render('home')
})

// @route '/create'
// Desc: Poll create GET Method
app.get('/create', pollController.pollGetController)

// @route '/create'
// Desc: Poll create POST Method
app.post('/create', pollController.pollPostController)

// @route '/polls/:id'
// Desc: Post single poll result
app.post('/polls/:id', pollController.pollResultPostController)

// @route '/polls/:id'
// Desc: Get single poll
app.get('/polls/:id', pollController.singlePollController)

// @route '/polls'
// Desc: Get the all Polls
app.get('/polls', pollController.getAllPolls)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App is listening to ${PORT}`))