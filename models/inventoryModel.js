const InventorySchema = {
    _id: { type: String, required: true },
    inventory_id: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit_price: { type: Number, required: true },
    supplier_id: { type: String, required: true },
    dimensions: { type: String },
    weight: { type: Number }
};
