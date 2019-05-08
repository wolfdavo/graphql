const graphql = require('graphql'); //importing graphql
const _ = require('lodash');

const { 
    GraphQLObjectType,
    GraphQLString, 
    GraphQLSchema,
    GraphQLID
     } = graphql; // deconstrucing graphql tp take out what we need 

//dummy array for testing before an actual database 
var books = [
    {author:'steve',id:"1"},
    {author:'barry',id:"2"},
    {author:'john',id:"3"}
]

//Defining a graphql object. This is our book object.
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})


//Root quries are landing points for graphql requests. 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db or other data source 
                return _.find(books, {id:args.id})
            }
        }
    }
})


//Exporting as a graphql schema with one query as our root query 
module.exports = new GraphQLSchema({
    query: RootQuery
})