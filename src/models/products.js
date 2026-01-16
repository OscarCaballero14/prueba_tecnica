import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name       : { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price      : { type: Number, required: true, min: 0 },
    currency   : { type: String, required: true, uppercase: true, minlength: 3, maxlength: 3},
    stock      : { type: Number, required: true, min: 0},
    isActive   : { type: Boolean, required: true, default: true},
    category   : { type: String, required: true, trim: true},
    createdAt  : { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;