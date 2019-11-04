const _ = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, } = require('graphql')


// dummy data
const books = [
  { id: '1', name: 'Wind', genre: 'Fantasy', authorId: '1' },
  { id: '2', name: 'Empire', genre: 'Fantasy', authorId: '2' },
  { id: '3', name: 'Earth', genre: 'Sci-Fi', authorId: '3' },
]

// dummy data
const authors = [
  { id: '1', name: 'Wang', age: 10 },
  { id: '2', name: 'Kid', age: 20 },
  { id: '3', name: 'King', age: 30 },
]


const BookType = new GraphQLObjectType({
  name: 'Books',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId })
      },
    },
  }),
})

const AuthorType = new GraphQLObjectType({
  name: 'Authors',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id })
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id })
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
