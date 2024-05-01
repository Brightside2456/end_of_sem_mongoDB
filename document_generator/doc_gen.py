import random
from faker import Faker
from datetime import datetime
import json

fake = Faker()

# Keys are in single Quotes
# def generate_dummy_document(collection_name, column_names, n):
#     documents = []
#     for _ in range(n):
#         document = {}
#         if "transaction" in collection_name.lower():
#             document["transaction_id"] = "T" + ''.join(random.choices("0123456789", k=6))
#             document["customer_id"] = "C" + ''.join(random.choices("0123456789", k=6))
#             document["products_sold"] = ["P" + ''.join(random.choices("0123456789", k=3)) for _ in range(random.randint(1, 5))]
#             transaction_date = datetime(2023, 7, 17, 7, 11, 52).strftime("%Y-%m-%dT%H:%M:%SZ")  # Adjusted format
#             document["transaction_date"] = transaction_date
#             total_amount = round(random.uniform(10, 1000), 2)
#             document["total_amount"] = total_amount
#         elif "employee" in collection_name.lower():
#             document["employee_id"] = "E" + ''.join(random.choices("0123456789", k=3))
#             document["first_name"] = fake.first_name()
#             document["last_name"] = fake.last_name()
#             document["role"] = fake.job()
#             document["contact_info"] = {
#                 "email": fake.email(),
#                 "phone_number": fake.phone_number()
#             }
#             document["work_schedule"] = fake.random_element(elements=("Monday to Friday, 9:00 AM - 5:00 PM", "Flexible"))
#         elif "customer" in collection_name.lower():
#             document["customer_id"] = "C" + ''.join(random.choices("0123456789", k=6))
#             document["first_name"] = fake.first_name()
#             document["last_name"] = fake.last_name()
#             document["email"] = fake.email()
#             document["phone_number"] = fake.phone_number()
#             document["purchase_history"] = ["T" + ''.join(random.choices("0123456789", k=6)) for _ in range(random.randint(0, 5))]
#         elif "supplier" in collection_name.lower():
#             document["supplier_id"] = "S" + ''.join(random.choices("0123456789", k=3))
#             document["company_name"] = fake.company()
#             document["contact_info"] = {
#                 "email": fake.email(),
#                 "phone_number": fake.phone_number()
#             }
#         elif "product" in collection_name.lower():
#             document["product_id"] = "P" + ''.join(random.choices("0123456789", k=3))
#             document["name"] = fake.word()
#             document["category"] = fake.word()
#             document["description"] = fake.sentence()
#             document["brand"] = fake.company()
#         elif "inventory" in collection_name.lower():
#             document["inventory_id"] = "P" + ''.join(random.choices("0123456789", k=3))
#             document["quantity"] = random.randint(1, 100)
#             document["unit_price"] = round(random.uniform(10, 1000), 2)
#             document["supplier_id"] = "S" + ''.join(random.choices("0123456789", k=3))
#             document["dimensions"] = f"{random.randint(1, 50)} x {random.randint(1, 50)} x {random.randint(1, 50)}"
#             document["weight"] = round(random.uniform(0.5, 50), 2)
#         documents.append(document)
#     return documents

# # Example usage:
# collection_name = "transaction"
# column_names = []  # Add column names here if needed
# n = 1



# Number of dummy documents to generate

# dummy_documents = generate_dummy_document(collection_name, column_names, n)
# for doc in dummy_documents:
#     print(doc)

# Keys are double Quotes
def generate_dummy_document(collection_name, column_names, n):
    documents = []
    for _ in range(n):
        document = {}
        if "transaction" in collection_name.lower():
            document["transaction_id"] = "T" + ''.join(random.choices("0123456789", k=6))
            document["customer_id"] = "C" + ''.join(random.choices("0123456789", k=6))

            # Generate products_sold as objects with name, quantity, and unit_price
            products_sold = []
            for _ in range(random.randint(1, 5)):
                product = {
                    "name": fake.word(),
                    "quantity": random.randint(1, 100),
                    "unit_price": round(random.uniform(10, 1000), 2)
                }
                products_sold.append(product)
            document["products_sold"] = products_sold

            transaction_date = datetime(2023, 7, 17, 7, 11, 52).strftime("%Y-%m-%dT%H:%M:%SZ")
            document["transaction_date"] = transaction_date

            total_amount = round(random.uniform(10, 1000), 2)
            document["total_amount"] = total_amount

        elif "employee" in collection_name.lower():
            document["employee_id"] = "E" + ''.join(random.choices("0123456789", k=3))
            document["first_name"] = fake.first_name()
            document["last_name"] = fake.last_name()
            document["role"] = fake.job()
            document["contact_info"] = {
                "email": fake.email(),
                "phone_number": fake.phone_number()
            }
            document["work_schedule"] = fake.random_element(elements=("Monday to Friday, 9:00 AM - 5:00 PM", "Flexible"))

        elif "customer" in collection_name.lower():
            document["customer_id"] = "C" + ''.join(random.choices("0123456789", k=6))
            document["first_name"] = fake.first_name()
            document["last_name"] = fake.last_name()
            document["email"] = fake.email()
            document["phone_number"] = fake.phone_number()
            document["password"] = fake.password(length=10, special_chars=True, digits=True, upper_case=True, lower_case=True)
            document["address"] = [f"{random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')} {random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')} - {''.join(random.choices('0123456789', k=3))}-{''.join(random.choices('0123456789', k=4))}" for _ in range(random.randint(0, 5))]

        elif "supplier" in collection_name.lower():
            document["supplier_id"] = "S" + ''.join(random.choices("0123456789", k=3))
            document["company_name"] = fake.company()
            document["contact_info"] = {
                "email": fake.email(),
                "phone_number": fake.phone_number()
            }
        elif "product" in collection_name.lower():
            document["product_id"] = "P" + ''.join(random.choices("0123456789", k=3))
            document["name"] = fake.word()
            document["category"] = fake.word()
            document["description"] = fake.sentence()
            document["brand"] = fake.company()
        elif "inventory" in collection_name.lower():
            document["inventory_id"] = "P" + ''.join(random.choices("0123456789", k=3))
            document["product_id"] = "P" + ''.join(random.choices("0123456789", k=3))
            document["quantity"] = random.randint(1, 100)
            document["unit_price"] = round(random.uniform(10, 1000), 2)
            document["supplier_id"] = "S" + ''.join(random.choices("0123456789", k=3))
            document["dimensions"] = f"{random.randint(1, 50)} x {random.randint(1, 50)} x {random.randint(1, 50)}"
            document["weight"] = round(random.uniform(0.5, 50), 2)

        documents.append(document)
    return documents

# Example usage:
collection_name = "customer"
column_names = []  # Add column names here if needed
n = 5  # Number of dummy documents to generate

dummy_documents = generate_dummy_document(collection_name, column_names, n)
for doc in dummy_documents:
    print(json.dumps(doc))
