import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name     : { type: String, required: true, trim: true },
    lastName : { type: String, required: true, trim: true },
    email    : { type: String, required: true, trim: true, unique: true },
    phone    : { type: String, required: true, trim: true, unique: true },
    address  : { type: String, required: true, trim: true },
    password : { type: String, required: true, trim: true },
    role     : { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;