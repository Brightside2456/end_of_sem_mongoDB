const ProductSchema = {
    _id: { type: String, required: true },
    product_id: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    brand: { type: String }
};
