const express = require('express'); // Import the Express framework for building the server
const { MongoClient } = require('mongodb'); // Import the MongoClient class for interacting with MongoDB
const cors = require('cors'); // Import the CORS middleware for handling cross-origin requests
require('dotenv').config(); // Load environment variables from a .env file

const app = express(); // Create an instance of the Express application
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies from incoming requests

const port = process.env.PORT || 5000; // Set the port to the value in the environment variable or default to 5000
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017'; // MongoDB connection URI, either from environment variable or local
const dbName = 'great_notes'; // The name of the MongoDB database to use

let db; // Variable to hold the database connection

// Connect to the MongoDB server
MongoClient.connect(mongoUri)
  .then((client) => {
    db = client.db(dbName); // Assign the connected database to the db variable
    console.log(`Connected to MongoDB: ${dbName}`); // Log success message
  })
  .catch((error) => console.error('Failed to connect to MongoDB', error)); // Log any connection errors

// Optional root route
app.get('/', (req, res) => {
  res.send('Welcome to the Great Notes API!'); // Send a welcome message when accessing the root URL
});

// API endpoint to fetch testimonials
app.get('/testimonials', (req, res) => {
  const collection = db.collection('Testimonials'); // Get the Testimonials collection from the database
  collection.find({}).toArray((err, testimonials) => { // Find all testimonials and convert them to an array
    if (err) {
      res.status(500).send('Error fetching testimonials'); // Send error response if fetching fails
      return; // Exit the function
    }
    res.json(testimonials); // Respond with the testimonials in JSON format
  });
});

// API endpoint to add a new testimonial
app.post('/testimonials', (req, res) => {
  const collection = db.collection('Testimonials'); // Get the Testimonials collection
  const testimonial = req.body; // Get the testimonial data from the request body

  collection.insertOne(testimonial) // Insert the new testimonial into the collection
    .then(result => {
      res.status(201).send({ _id: result.insertedId, ...testimonial }); // Respond with the inserted testimonial, including its new ID
    })
    .catch(error => {
      console.error('Error inserting testimonial:', error); // Log any insertion errors
      res.status(500).send('Error inserting testimonial'); // Send error response if insertion fails
    });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Log a message indicating the server is running
});
