const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'إسم المجموعة مطلوب']
    },
    description: {
        type:String,
        required: [true, 'وصف المجموعة مطلوب']
    },
    user_id: {
        type: String,
        require: true
    },
})

const Groups = mongoose.model('groups', groupSchema);
module.exports = Groups;