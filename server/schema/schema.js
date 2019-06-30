const graphql = require('graphql')
const _ = require('lodash')

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema} = graphql

const books = [
    {name: 'a', genre: 'qw', id: "1", authorId: "2"},
    {name: 'b', genre: 'qw', id: "2", authorId: "2"},
    {name: 'c', genre: 'az', id: "3", authorId: "2"},
    {name: 'd', genre: 'az', id: "4", authorId: "3"},
    {name: 'e', genre: 'qw', id: "5", authorId: "1"}
]

const authors = [
    {name: 'z', age: 31, id: "1"},
    {name: 'y', age: 32, id: "2"},
    {name: 'x', age: 33, id: "3"}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args){
                return _.find(books, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args){
                return _.find(authors, {id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})