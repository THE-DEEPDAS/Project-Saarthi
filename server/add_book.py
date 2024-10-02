import os
import uuid
from db import create_book

# Update the path to use the parent directory of the current script
BOOK_FILES_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'book_files')

def add_book(title, subtitle, category, price, images, description, stock, original_filename):
    # Generate a new file_id
    file_id = str(uuid.uuid4())

    # The original file should already be in the book_files folder
    original_path = os.path.join(BOOK_FILES_FOLDER, original_filename)

    if not os.path.exists(original_path):
        print(f"Error: File {original_filename} not found in {BOOK_FILES_FOLDER}")
        return

    new_book = {
        'title': title,
        'subtitle': subtitle,
        'category': category,
        'price': price,
        'images': images,
        'description': description,
        'stock': stock,
        'purchased_quantity': 0,
        'file_id': file_id,
        'file_name': original_filename
    }

    book_id = create_book(new_book)
    print(f"Added new book with ID: {book_id}")
    print(f"Associated with file: {original_filename}")
    print(f"File ID: {file_id}")

# Usage
add_book('Class 12 Board Biology', 'Class 12', 'Class 12', '₹699', 
         ['/placeholder.svg?height=400&width=300'], 
         'Comprehensive guide for Class 12 Board Biology', 
         10, 'class_12_bio.pdf')