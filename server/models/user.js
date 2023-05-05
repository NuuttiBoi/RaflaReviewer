const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const url = process.env.DB_HOST
console.log('connecting to ', url)

mongoose.connect(url)
    .then(result => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connecting to MongoDB: ", error.message);
    })

    const userSchema = new mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        firstname: String,
        lastname: String,
        avatar: String
    })

    userSchema.pre("save", async function (next){
        const user = this;
        if (!user.isModified("password")){
            return next()
        }
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        next()
    })

    userSchema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password)
    }

    userSchema.set("toJSON", {
        transform: function (doc, ret, options){
            delete ret.password
            return ret
        }
    })

module.exports = mongoose.model("User", userSchema)