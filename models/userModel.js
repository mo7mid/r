const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'الإسم مطلوب']
    },
    email:{
        type:String,
        required:[true,'البريد الإلكتروني مطلوب'],
        unique: true,
        lowercase: true,
        validate:[validator.isEmail, 'البريد الإلكتروني مطلوب']
    },
    password:{
        type:String,
        required:[true,'كلمة المرور مطلوبة'],
        minlength:8
    },
    passwordConfirm:{
        type: String,
        required: [true, 'إعادة كلمة المرور مطلوبة'],
        minlength: 8,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'كلمة المرور ليست متطابقة'
        }
    },
    location:{
        type:String,
        required: [true, 'الموقع مطلوب']
    },
    status:{
        type:String, 
    },
    theme_color:{
        type:String
    },
    theme_image:{
        type:String
    },
    is_notification: {
        type:String,
        default: 1
    },
    is_muted: {
        type:String,
        default: 1
    },
    is_lastseen: {
        type:String,
        default: 1
    },
    last_seen_date: {
        type:String,
        default: 1
    },
    is_status: {
        type:String
    },
    is_profile: {
        type:String,
        default: 1
    },
    profile: String,
    bg_image: String,
    passwordChangedAt: Date,
    passwordResetToken:String,
    passwordResetExpires:Date
},
{
    timestamps: {}
});

// Convert bcrypt password
userSchema.pre('save', async function(next){
    // Only run this function if password was actually modified
    if(!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password,12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

// Login Corrent password 
userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}

// ------ Reset Token ----------//
// Generate the random reset token
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now()+10 * 60 * 100;
    return resetToken;
}

const User = mongoose.model('User',userSchema);
module.exports = User;