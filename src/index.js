import express from "express";
import { PORT } from "./config/config.js";
import connectDB from "./config/db.js";
import cors from 'cors';
import userRouters from "./routes/users.routes.js";
import authRouters from "./routes/auth.routes.js";
import productRouters from "./routes/products.routes.js";

const app = express();
await connectDB();

app.use(cors());
app.use(express.json());
app.use(userRouters);
app.use(authRouters);
app.use(productRouters);

app.listen(PORT);
console.log("Aplicacion corriendo en el puerto:", PORT);