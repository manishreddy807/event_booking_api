const express  = require('express');
const app = express();
const connectDB = require('./config/db');
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index')
const {graphqlHTTP} = require('express-graphql');
const isAuth = require( './middleware/is-Auth' );

connectDB()
app.use(express.json());
app.use(isAuth);

app.use('/graphql', graphqlHTTP({
     schema: graphqlSchema,
     rootValue: graphqlResolvers,
}))

app.listen(3002, () => {
    console.log('server running at 3002')
})