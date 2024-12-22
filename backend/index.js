import express, { request, response } from 'express';
import { mongoDBURL, PORT } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModels.js';

const app = express();

// middleware for parsing request body
app.use(express.json())


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to this page')
})


// route for creating and saving a new book
app.post('/books', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'send all required fields: title, author, publishYear'
            })
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        const book = await Book.create(newBook)

        return response.status(201).send(book);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
        
    }
})

// route for getting all books from database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
        
    }
})


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