const EmployeeSchema = {
    _id: { type: String, required: true },
    employee_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    role: { type: String, required: true },
    contact_info: {
        email: { type: String, required: true },
        phone_number: { type: String },
    },
    work_schedule: { type: String }
};
