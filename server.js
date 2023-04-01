const express = require('express') // Importing express
const morgan = require('morgan') // Middleware
const bodyParser = require('body-parser')
const cors = require('cors')

// Mongoose ------------------------------------------------
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test-db');

const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established!')
})

const contactRoute = require('./api/routes/contact')
const userRoute = require('./api/routes/user')


const app = express() // creating express application

// Morgan --------------------------------------
app.use(morgan('dev')) // we can see dev mode now

// Body Parser ----------------------------------
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Cors
app.use(cors())

// Server Create. Port => Listen
const PORT = process.env.PORT || 3000

app.use('/api/contacts', contactRoute)
app.use('/api/users', userRoute)


// app.use((req, res, next) => {
//     console.log('I am a middleware')
//     next();
// })

// Server => Port -----------------------------------------
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.get('/', (req, res, next) => {
    res.send('Hello World')
})
const contacts = [
    { name: 'Shahadat', email: 'shahadat.sust.math@gmail.com' },
    { name: 'Nirob', email: 'nirobsyclonite@gmail.com' },
    { name: 'Neal', email: 'nealcaffrey@gmail.com' }
]