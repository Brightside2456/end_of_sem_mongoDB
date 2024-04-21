const SupplierSchema = {
    _id: { type: String, required: true },
    supplier_id: { type: String, required: true },
    company_name: { type: String, required: true },
    contact_info: {
        email: { type: String },
        phone_number: { type: String }
    }
};
