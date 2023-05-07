const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const url = process.env.DB_HOST
console.log('connecting to ', url)

/**
 * Yhdistää MongoDB:hen käyttäen muutujassa DB_HOST URL:ia
 */
mongoose.connect(url)
    .then(result => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connecting to MongoDB: ", error.message);
    })

/**
 * Mongoose-käyttäjämalli tallennettavalle käyttäjäoliolle
 *
 * @typedef User
 * @property username - Käyttäjänimi.
 * @property password - Salasana.
 * @property [firstname] - Etunimi.
 * @property [lastname] - Sukunimi.
 * @property [avatar] - Avatar-kuvan URL.
 */
    const userSchema = new mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        firstname: String,
        lastname: String,
        avatar: String
    })

/**
 * Suoritetaan ennen tallennusta: Hashaa käyttäjän salasanan bcrypt-algoritmilla.
 */
    userSchema.pre("save", async function (next){
        const user = this;
        if (!user.isModified("password")){
            return next()
        }
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        next()
    })

/**
 * Vertaa käyttäjän syöttämää salasanaa tallennetun salasanan kanssa bcrypt-algoritmilla.
 * @param password - Käyttäjän salasana.
 * @returns {Promise<void|*|NodeJS.Global.Promise>}
 */
    userSchema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password)
    }

/**
 * Muuntaa Mongoose-käyttäjämallin JavaScript-objektiksi ja poistaa salasanan.
 */
userSchema.set("toJSON", {
        transform: function (doc, ret, options){
            delete ret.password
            return ret
        }
    })

module.exports = mongoose.model("User", userSchema)