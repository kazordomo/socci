
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true
    },
    nickname: {
        type: String,
        unique: true,
        trim: true,
        maxlength: 12
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    createdAt: { type: Date, default: Date.now }
});


userSchema.methods.generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = (password, storedPassword) => {
    return bcrypt.compareSync(password, storedPassword);
};

let User = mongoose.model('user', userSchema);
module.exports = User;