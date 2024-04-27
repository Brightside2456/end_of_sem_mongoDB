import datetime
import pymongo
from faker import Faker

# Replace with your connection details
client = pymongo.MongoClient("mongodb://localhost:27017/")  # Update connection string
db = client["test"]
product_collection = db["product"]
transaction_collection = db["transaction"]

fake = Faker()  # Create a Faker instance


# Fetch all product IDs
product_ids = [product["product_id"] for product in product_collection.find({}, {"product_id": 1})]
print(product_ids)

# Function to generate a sample document based on schema
validation_schema = {
"bsonType": "object",
"required": ["transaction_id", "customer_id", "products_sold", "transaction_date", "total_amount"],
"properties": {
"transaction_id": {
"bsonType": "string",
"description": "Unique identifier for the transaction"
},
"customer_id": {
"bsonType": "string",
"description": "Reference to the customer who made the transaction"
},
"products_sold": {
"bsonType": "array",
"description": "Array of product references involved in the transaction"
},
"transaction_date": {
"bsonType": "date",
"pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$",
"description": "Date and time of the transaction in ISO 8601 format"
},
"total_amount": {
"bsonType": "number",
"minimum": 0,
"description": "Total amount of the transaction"
}
}}


# Function to generate a sample document based on schema
def generate_sample_document(schema):
  document = {}
  for field, field_schema in schema["properties"].items():
    if field_schema.get("bsonType") == "date" and field_schema.get("pattern"):
      document[field] = datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ')  # ISO 8601
    if field_schema.get("bsonType") == "string":
      if field == "transaction_id":
        document[field] = fake.uuid4()  # Generate a UUID
      elif field == "customer_id":
        document[field] = fake.ean(length=8)  # Example: Generate customer ID
      else:
        document[field] = fake.text()
    elif field_schema.get("bsonType") == "number":
      document[field] = fake.random_number() 
    elif field_schema.get("bsonType") == "array":
      document[field] = []
   
    # elif field_schema.get("bsonType") == "array":
    #   document[field] ='ObjectId(\''+(product_ids[fake.random_int(min=0, max=len(product_ids)-1)] for _ in range(2))+'\')'


  return document

def write_to_file(data):
    with open('sample.txt','w') as file:
       
        file.write(data)
        
# Generate sample transactions with different product IDs
data = ""
for product_id in product_ids:
  sample_document = generate_sample_document(validation_schema)
  sample_document["products_sold"].append(product_id)
  # Construct the insert query
  insert_query = f"db.{transaction_collection.name}.insertOne({sample_document})"
  print(insert_query)
  data += insert_query +'\n'

write_to_file(data)

client.close()
