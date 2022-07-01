const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    googleID: String,
})

// 'users' -> create this collection if it doesn't exist already, userSchema -> model's name
mongoose.model('users', userSchema); 