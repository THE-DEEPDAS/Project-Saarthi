from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# MongoDB connection
client = MongoClient(os.getenv('MONGODB_URI'))
db = client['great_notes']
books_collection = db['books']

# Book schema
book_schema = {
    'title': str,
    'subtitle': str,
    'category': str,
    'price': str,
    'images': list,
    'description': str,
    'stock': int,
    'purchased_quantity': int,
    'file_name': str
}

def reset_database():
    db.drop_collection('books')
    db.create_collection('books')
    print("Books collection reset successfully")

def create_book(book_data):
    for key, value_type in book_schema.items():
        if key not in book_data or not isinstance(book_data[key], value_type):
            raise ValueError(f"Invalid or missing field: {key}")
    
    result = books_collection.insert_one(book_data)
    return str(result.inserted_id)

def get_all_books():
    return list(books_collection.find())

def get_book(book_id):
    return books_collection.find_one({'_id': ObjectId(book_id)})

def update_book(book_id, book_data):
    result = books_collection.update_one({'_id': ObjectId(book_id)}, {'$set': book_data})
    return result.modified_count > 0

def delete_book(book_id):
    result = books_collection.delete_one({'_id': ObjectId(book_id)})
    return result.deleted_count > 0

def decrease_stock(book_id):
    result = books_collection.update_one(
        {'_id': ObjectId(book_id), 'stock': {'$gt': 0}},
        {'$inc': {'stock': -1, 'purchased_quantity': 1}}
    )
    return result.modified_count > 0