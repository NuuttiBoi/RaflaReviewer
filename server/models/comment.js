const mongoose = require('mongoose')

const url = process.env.DB_HOST
console.log('connecting to ', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB: ', error.message)
    })

    // Skeema määrittelee miten ravintola-oliot tallennetaan tietokantaan
    const commentSchema = new mongoose.Schema({
        restaurantId: String,
        username: String,
        userId: String,
        content: String
    })

    commentSchema.set('toJSON', {
        transform: (document, returnedObject) => {
          returnedObject.id = returnedObject._id.toString()
          delete returnedObject._id
          delete returnedObject.__v
        }
    })

module.exports = mongoose.model('Comment', commentSchema)