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
    const resSchema = new mongoose.Schema({
        name: String,
        address: String,
        foodScore: Number,
        qualityPriceScore: Number,
        experienceScore: Number,
        tags: [String],
        thumbsUp: [String],
        thumbsDown: [String],
        userId: String
    })

    resSchema.set('toJSON', {
        transform: (document, returnedObject) => {
          returnedObject.id = returnedObject._id.toString()
          delete returnedObject._id
          delete returnedObject.__v
        }
    })


module.exports = mongoose.model('Restaurant', resSchema)