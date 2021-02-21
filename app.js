const express = require('express');
const app = express();
const logger = require('morgan');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const schema =  require('./schemas/schema');

const port = 3000;

const schemaM = buildSchema(`
    type Query {
        Hello: String
    }
`);

const root = {
    hello: () => {
        return 'Hello world';
    },
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/graphql', graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: true
}));

app.get('/', (req, res) => {
    res.send('Hello world!')
});
app.listen(port, () => {
    console.log('app running at port: ' + port)
});
