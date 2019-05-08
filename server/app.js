const express = require('express'); //reqire express 
const graphqlHTTP = require('express-graphql'); //Express doesnt know what to do with graphql quries by default, so we require this package that it can hand the queries off to.
const schema = require('./schema/schema');
const app = express(); //making an express app(server)

//this is saying 'we got a hit on the /graphql endpoint, i dont know what to do with it so im gonna give it to graphqlHTTP which is a function that handles gql requests.'
//it takes an argument of an object
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


//Server listener 
app.listen(4000, () => {
    console.log('Now listening for requests on port 4000')
})