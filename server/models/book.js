const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: String,
    pages: Number,
    authorId: String
})

module.exports = mongoose.model('Book', bookSchema)