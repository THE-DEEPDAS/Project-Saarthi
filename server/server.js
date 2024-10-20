const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'great_notes';

let db;

MongoClient.connect(mongoUri)
  .then((client) => {
    db = client.db(dbName);
    console.log(`Connected to MongoDB: ${dbName}`);
  })
  .catch((error) => console.error('Failed to connect to MongoDB', error));


// Optional root route
app.get('/', (req, res) => {
  res.send('Welcome to the Great Notes API!');
});

// API endpoint to fetch testimonials
app.get('/testimonials', (req, res) => {
  const collection = db.collection('Testimonials');
  collection.find({}).toArray((err, testimonials) => {
    if (err) {
      res.status(500).send('Error fetching testimonials');
      return;
    }
    res.json(testimonials);
  });
});

// API endpoint to add a new testimonial
app.post('/testimonials', (req, res) => {
  const collection = db.collection('Testimonials');
  const testimonial = req.body;

  collection.insertOne(testimonial)
    .then(result => {
      res.status(201).send({ _id: result.insertedId, ...testimonial }); // Respond with the inserted testimonial
    })
    .catch(error => {
      console.error('Error inserting testimonial:', error);
      res.status(500).send('Error inserting testimonial');
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
