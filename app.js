const express = require('express');
const app = express();
const logger = require('morgan');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const schema =  require('./schemas/schema');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jome', {useNewUrlParser: true})
    .then(() => console.log('MongoDB successfully connected'))
    .catch((err)=> console.log('Failed to connect o mongoDb: ', err));


const productsRouter = require('./routes/products');

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
app.use('/products', productsRouter );

app.get('/', (req, res) => {
    res.send('Hello world!')
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('app running at port: ' + port)
});
