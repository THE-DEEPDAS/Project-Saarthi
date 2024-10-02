const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const books = [
  { id: 1, title: "To Kill a Mockingbird", price: "$10.99" },
  { id: 2, title: "1984", price: "$9.99" },
  // ... more books
];

app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));