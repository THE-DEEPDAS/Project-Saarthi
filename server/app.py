from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Mock database
books = [
    {"id": 1, "title": "To Kill a Mockingbird", "author": "Harper Lee"},
    {"id": 2, "title": "1984", "author": "George Orwell"},
    {"id": 3, "title": "Pride and Prejudice", "author": "Jane Austen"},
    {"id": 4, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald"},
    {"id": 5, "title": "Moby-Dick", "author": "Herman Melville"},
]

@app.route('/api/books', methods=['GET'])
def get_books():
    # Simulate occasional server errors
    if random.random() < 0.1:  # 10% chance of error
        return jsonify({"error": "Internal Server Error"}), 500
    return jsonify(books)

if __name__ == '__main__':
    app.run(debug=True, port=5000)