import express, { request, response } from 'express';
import { mongoDBURL, PORT } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModels.js';
import booksRoute from './routes/bookRoute.js'
import cors from 'cors';

const app = express();

// middleware for parsing request body
app.use(express.json())

// middle ware for handing cors policy
// option 1. Allow all origin with Default of cors
app.cors(cors());

// Option 2: Allow custom origin
app.use(
    cors({
        origin: '',
        methods: [],
        allowedHeaders: [],
    })
)

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to this page')
})


app.use('/books', booksRoute);



mongoose.connect(mongoDBURL)
.then(() => {
    console.log('Appp connected to database sucessfully');
    
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
    
})
})
.catch((error) => {
    console.log(error);
    
})