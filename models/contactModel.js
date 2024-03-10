const mongoose = require('mongoose');
const validator = require('validator');
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'الإسم مطلوب']
    },
    email: {
        type: String,
        required: [true, 'البريد الإلكتروني مطلوب'],
        validate: [validator.isEmail, 'البريد الإلكتروني مطلوب']
    },
    message: {
        type: String
    },
    is_favourite:{
        type:String,
        default: '0'
    },
    user_id: {
        type: String,
        ref:"User",
        require: true
    },
    created_by: {
        type: String,
        require: true
    },
    last_msg_date:Date
},
{
    timestamps: {}
});

const Contact = mongoose.model('contact', contactSchema);
module.exports = Contact;