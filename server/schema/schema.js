const graphql = require('graphql'); //importing graphql
const _ = require('lodash');
const Book = require('../model/book');
const Author = require('../model/author');

const { 
    GraphQLObjectType,
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
     } = graphql; // deconstrucing graphql tp take out what we need 

//dummy array for testing before an actual database 
// var books = [
//     {name: 'Name of the Wind',genre: 'Fantasy',id:"1", authorid: '1'},
//     {name: 'The Final Empire',genre: 'Fantasy',id:"2", authorid: '2'},
//     {name: 'The Long Earth',genre: 'Sci-Fi',id:"3", authorid: '3'},
//     {name: 'the Hero of Ages',genre: 'Fantasy',id:"4", authorid: '2'},
//     {name: 'The Color of Magic',genre: 'Fantasy',id:"5", authorid: '3'},
//     {name: 'The Light Fantastic',genre: 'Sci-Fi',id:"6", authorid: '3'}
// ];

// var authors = [
//     {name: 'Patric Rothfuss', age: 44, id:'1'},
//     {name: 'Brandon Sanderson', age: 42, id:'2'},
//     {name: 'Terry Pratchett', age: 66, id:'3'}
// ]

//Defining a graphql object. This is our book object.
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        authorid: {type: GraphQLID},
        author: {
            type: AuthorType,
            // resolve(parent, args){
            //     return _.find(authors, {id: parent.authorid})
            // }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            // resolve(parent, args){
            //     return _.filter(books, {authorid: parent.id})
            // }
        }
    })
})



//Root quries are landing points for graphql requests. 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            // resolve(parent, args){
            //     console.log(args.id)
            //     //code to get data from db or other data source 
            //     return _.find(books, {id:args.id})
            // }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            // resolve(parent, args){
            //     return _.find(authors, {id: args.id})
            // }
        },
        books: {
            type: new GraphQLList(BookType),
            // resolve(parent, args){
            //     return books
            // }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            // resolve(parent, args){
            //     return authors
            // }
        }
    }
})


//thos is how data is changed 
const Mutations = new GraphQLObjectType({
    name: 'Mutator',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args:  {
                name: {type: GraphQLString},
                authorid: {type: GraphQLID},
                genre: {type: GraphQLString}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorid: args.authorid
                });
                return book.save();
            }
        }
    }
})


//Exporting as a graphql schema with one query as our root query 
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
})