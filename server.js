const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true
}))


app.listen(4000, () => {
  console.log('server ok')
})

///////////
const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))


app.listen(4000, () => {
  console.log('server ok')
})

