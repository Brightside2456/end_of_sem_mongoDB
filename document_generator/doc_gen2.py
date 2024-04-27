import random
import string
from datetime import datetime, timedelta
from bson import ObjectId

# Helper functions
def random_string(length):
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for _ in range(length))

def random_date(start, end):
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = random.randrange(int_delta)
    return start + timedelta(seconds=random_second)

def generate_documents(collection_name, num_documents):
    documents = []

    if collection_name == "logs":
        log_types = ["error", "warning", "info", "debug"]
        for _ in range(num_documents):
            document = {
                "log_id": random_string(10),
                "log_type": random.choice(log_types),
                "log_message": random_string(20),
                "timestamp": datetime.utcnow(),
                "user_id": random_string(8)
            }
            documents.append(document)

    elif collection_name == "reviews":
        for _ in range(num_documents):
            document = {
                "review_id": random_string(8),
                "product_id": str(ObjectId()),
                "customer_id": str(ObjectId()),
                "rating": random.randint(1, 5),
                "review_text": random_string(50),
                "timestamp": datetime.utcnow()
            }
            documents.append(document)

    elif collection_name == "orders":
        for _ in range(num_documents):
            order_items = []
            num_items = random.randint(1, 5)
            for _ in range(num_items):
                order_item = {
                    "product_id": str(ObjectId()),
                    "quantity": random.randint(1, 10),
                    "price": round(random.uniform(10.0, 1000.0), 2)
                }
                order_items.append(order_item)

            document = {
                "order_id": random_string(10),
                "customer_id": str(ObjectId()),
                "order_date": datetime.utcnow(),
                "order_items": order_items,
                "total_amount": sum(item["quantity"] * item["price"] for item in order_items),
                "shipping_address": {
                    "street": random_string(15),
                    "city": random_string(10),
                    "state": random_string(2),
                    "zip": random_string(5),
                    "country": random_string(3)
                },
                "order_status": random.choice(["pending", "shipped", "delivered", "cancelled"])
            }
            documents.append(document)

    elif collection_name == "promotions":
        promotion_types = ["discount", "free shipping", "buy-one-get-one"]
        start_date = datetime.utcnow()
        end_date = start_date + timedelta(days=30)

        for _ in range(num_documents):
            document = {
                "promotion_id": random_string(8),
                "promotion_type": random.choice(promotion_types),
                "description": random_string(30),
                "start_date": random_date(start_date, end_date),
                "end_date": random_date(start_date, end_date),
                "criteria": {
                    "minimum_purchase": random.uniform(50.0, 500.0)
                }
            }
            documents.append(document)

    return documents

# Example usage
collection_name = "reviews"
num_documents = 5

documents = generate_documents(collection_name, num_documents)
print(documents)