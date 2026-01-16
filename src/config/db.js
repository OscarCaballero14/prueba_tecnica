import mongoose from 'mongoose';
import { MONGODB_URI } from './config.js';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Conexión a MongoDB exitosa");
    } catch (err) {
        console.error("Error al conectar a MongoDB", err);
        process.exit(1);
    }
};

export default connectDB;