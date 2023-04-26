const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]


const url = `mongodb+srv://rafla:${password}@cluster0.xhepl2q.mongodb.net/raflareviewer?retryWrites=true&w=majority`
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
        tags: [String]
    })

    resSchema.set('toJSON', {
        transform: (document, returnedObject) => {
          returnedObject.id = returnedObject._id.toString()
          delete returnedObject._id
          delete returnedObject.__v
        }
    })


module.exports = mongoose.model('Restaurant', resSchema)