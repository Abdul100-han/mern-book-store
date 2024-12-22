import express, { request, response } from 'express';
import { mongoDBURL, PORT } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModels.js';
import booksRoute from './routes/bookRoute.js'


const app = express();

// middleware for parsing request body
app.use(express.json())


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