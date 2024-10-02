import os
from db import reset_database, create_book

BOOK_FILES_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'book_files')

def populate_database():
    reset_database()
    
    for filename in os.listdir(BOOK_FILES_FOLDER):
        if filename.endswith('.pdf'):
            book_name = os.path.splitext(filename)[0].replace('_', ' ').title()
            
            book_data = {
                'title': book_name,
                'subtitle': 'Class 12',  # You may want to adjust this
                'category': 'Class 12',  # You may want to adjust this
                'price': '₹599',  # You may want to adjust this
                'images': ['/placeholder.svg?height=400&width=300'],  # You may want to adjust this
                'description': f'Comprehensive guide for {book_name}',
                'stock': 10,
                'purchased_quantity': 0,
                'file_name': filename
            }
            
            book_id = create_book(book_data)
            print(f"Added book: {book_name} with ID: {book_id}")

if __name__ == '__main__':
    populate_database()