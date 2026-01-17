import express from "express";
import { PORT } from "./config/config.js";
import connectDB from "./config/db.js";
import cors from 'cors';
import userRouters from "./routes/users.routes.js";
import authRouters from "./routes/auth.routes.js";
import productRouters from "./routes/products.routes.js";
import orderRouters from "./routes/order.routes.js";
import paymentsRouters from "./routes/payments.routes.js";
import mockPaymentRouters from "./routes/mockPayment.routes.js";

const app = express();
await connectDB();

app.use(cors());
app.use(
    express.json({
        verify: (req, res, buf) => {
            req.rawBody = buf.toString();
        }
  })
);
app.use(userRouters);
app.use(authRouters);
app.use(productRouters);
app.use(orderRouters);
app.use(paymentsRouters);
app.use(mockPaymentRouters);

app.listen(PORT);
console.log("Aplicacion corriendo en el puerto:", PORT);