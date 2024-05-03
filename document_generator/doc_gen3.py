import pymongo
import random
import string
import datetime
from faker import Faker

fake = Faker()
# MongoDB connection settings
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["test"]


# Function to generate random product name based on category
def generate_random_product_name(category):
    if category == 'Electronics':
        products = ['Smartphones', 'Laptops', 'Televisions', 'Headphones', 'Cameras', 'Smartwatches']
    elif category == 'Clothing':
        products = ['T-shirts', 'Jeans', 'Dresses', 'Shirts', 'Jackets', 'Shoes', 'Accessories']
    elif category == 'Home & Kitchen':
        products = ['Cookware', 'Small Appliances', 'Furniture', 'Home Decor', 'Kitchen Utensils', 'Dinnerware Sets']
    elif category == 'Beauty & Personal Care':
        products = ['Skincare Products', 'Makeup', 'Hair Care Products', 'Fragrances', 'Grooming Tools']
    elif category == 'Sports & Outdoors':
        products = ['Fitness Equipment', 'Camping Gear', 'Sporting Goods', 'Outdoor Apparel', 'Bicycles']
    elif category == 'Books':
        products = ['Fiction', 'Non-Fiction', 'Self-Help', 'Cookbooks', 'Children\'s Books']
    elif category == 'Toys & Games':
        products = ['Board Games', 'Puzzles', 'Action Figures', 'Dolls', 'Video Games']
    elif category == 'Automotive':
        products = ['Car Accessories', 'Maintenance Products', 'Car Care Products']
    elif category == 'Office Products':
        products = ['Desk Supplies', 'Office Furniture', 'Printer Supplies']
    elif category == 'Pet Supplies':
        products = ['Pet Food', 'Pet Toys', 'Pet Beds', 'Pet Grooming Supplies', 'Aquarium Supplies']
    else:
        products = ['Generic Product']
    
    return fake.random_element(products)

# Function to generate random product description
def generate_random_description():
    return fake.sentence()

# Function to generate random brand
def generate_random_brand():
    return fake.company()
# Function to generate random string of given length
def generate_random_string(length):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for _ in range(length))

# Function to generate random phone number
def generate_random_phone_number():
    return ''.join(random.choices(string.digits, k=10))

# Function to generate random email
def generate_random_email():
    return generate_random_string(8) + '@gmail.com'

# Function to generate random password
def generate_random_password():
    return generate_random_string(10)

# Function to generate random role
def generate_random_role():
    roles = ['admin', 'manager', 'employee']
    return random.choice(roles)

# Function to generate random transaction date
def generate_random_transaction_date():
    start_date = datetime.datetime(2020, 1, 1)
    end_date = datetime.datetime.now()
    return start_date + datetime.timedelta(seconds=random.randint(0, int((end_date - start_date).total_seconds())))

def generate_random_name():
    return fake.name()


# Function to fetch existing IDs from each collection
def fetch_ids(collection_name, id_field):
    collection = db[collection_name]
    ids = [doc[id_field] for doc in collection.find({}, {'_id': 0, id_field: 1})]
    return ids

# Generate and insert values based on schema validations
def insert_documents(collection_name, num_documents):
    collection = db[collection_name]

    if collection_name == 'employee':
        for _ in range(num_documents):
            document = {
                'first_name': generate_random_string(8),
                'last_name': generate_random_string(8),
                'email': generate_random_email(),
                'password': generate_random_password(),
                'role': generate_random_role(),
                'phone_number': generate_random_phone_number()
            }
            collection.insert_one(document)
    elif collection_name == 'supplier':
        for _ in range(num_documents):
            document = {
                'supplier_id': generate_random_string(7),
                'company_name': generate_random_string(10),
                'contact_info': {
                    'email': generate_random_email(),
                    'phone_number': generate_random_phone_number()
                }
            }
    elif collection_name == 'product':
        product_categories = [
        'Electronics', 'Clothing', 'Home & Kitchen', 'Beauty & Personal Care', 
        'Sports & Outdoors', 'Books', 'Toys & Games', 'Automotive', 
        'Office Products', 'Pet Supplies'
    ]
        
    
        for _ in range(num_documents):
            category = fake.random_element(product_categories)
            name = generate_random_product_name(category)

            document = {
                'product_id': 'P' + ''.join(random.choices(string.digits, k=3)),
                'name': name,
                'category': category,
                'description': generate_random_description(),
                'brand': generate_random_brand(),
                # 'unit_price': round(random.uniform(10, 1000), 2)  # Random unit price between 10 and 1000
            }
            collection.insert_one(document)
    # elif collection_name == 'customer':
    #     for _ in range(num_documents):
    #         customer_id = 'C' + ''.join(random.choices(string.digits, k=6))
    #         while customer_id in collection_ids['customer']: # Ensure customer_id is unique
    #             customer_id = 'C' + ''.join(random.choices(string.digits, k=6))

    #         document = {
    #             'customer_id': customer_id,
    #             'phone_number': generate_random_phone_number(),
    #             'name': generate_random_name()
    #         }
    #         collection.insert_one(document)
    elif collection_name == 'customer':
        for _ in range(num_documents):
            customer_id = 'C' + ''.join(random.choices(string.digits, k=6))
            while customer_id in collection_ids['customer']: # Ensure customer_id is unique
                customer_id = 'C' + ''.join(random.choices(string.digits, k=6))

            document = {
                # '_id': {'$oid': ''.join(random.choices(string.hexdigits, k=24))},  # Generate random ObjectID
                'customer_id': customer_id,
                'phone_number': generate_random_phone_number(),
                'name': generate_random_name()
            }
            collection.insert_one(document)
    elif collection_name == 'transaction':
        for _ in range(num_documents):
            products_sold = []
            for _ in range(random.randint(1, 5)): # Random number of products sold per transaction
                product = {
                    'quantity': random.randint(1, 100),
                    'unit_price': round(random.uniform(100, 1000), 2),
                    'id': random.choice(collection_ids['product'])  # Randomly choose product ID from available IDs
                }
                products_sold.append(product)

            # Randomly choose customer ID from available IDs in the customer collection
            customer_id = random.choice(collection_ids['customer'])

            document = {
                'transaction_id': 'T' + ''.join(random.choices(string.digits, k=6)),
                'customer_id': customer_id,
                'products_sold': products_sold,
                'transaction_date': generate_random_transaction_date(),
                'total_amount': round(sum(product['quantity'] * product['unit_price'] for product in products_sold), 2)
            }
            collection.insert_one(document)
    elif collection_name == 'inventory':
            product_ids = fetch_ids('product', '_id')
            supplier_ids = fetch_ids('supplier', '_id')
            for _ in range(num_documents):
                product_id = random.choice(product_ids)
                supplier_id = random.choice(supplier_ids)

                document = {
                    'inventory_id': 'P' + ''.join(random.choices(string.digits, k=3)),
                    'product_id': product_id,  # Reference product_id as ObjectID
                    'quantity': random.randint(1, 100),
                    'unit_price': round(random.uniform(100, 1000), 2),
                    'supplier_id': supplier_id,  # Reference supplier_id as ObjectID
                    'dimensions': f"{random.randint(1, 50)} x {random.randint(1, 50)} x {random.randint(1, 50)}",
                    'weight': round(random.uniform(1, 50), 2)
                }
                collection.insert_one(document)

# Fetch IDs from each collection
collection_ids = {}
collection_ids['customer'] = fetch_ids('customer', 'customer_id')
collection_ids['product'] = fetch_ids('product', 'product_id')
collection_ids['supplier'] = fetch_ids('supplier', 'supplier_id')

# Example: Insert 5 documents into the 'employee' collection
insert_documents('transaction', 18)

print("Documents inserted successfully!")
