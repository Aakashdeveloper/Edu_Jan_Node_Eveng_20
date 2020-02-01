const express = require('express');
const expressGraphQL = require('express-graphql');
const port = 8600;
const app = express();
var schema = require('./schema/schema');

app.use('/graphql', expressGraphQL({
    schema,
    graphiql:true
}));

app.listen(port,() => {
    console.log(`App is running on port ${port}`)
});