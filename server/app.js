const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb+srv://Ugo:0000@cluster0-0a2hz.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('MongoDB connected')
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('Listening on port 4000')
})