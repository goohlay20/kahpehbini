import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import db from './config/db.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import { pageNotFound, errorHandler } from './middleswares/error.middleware.js';
import addressRoutes from './routes/address.routes.js';

dotenv.config();

const app = express();
const baseURL="/api/v1";

db();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  })
);
app.use(express.json());
app.use(helmet());

app.use(`${baseURL}/users`, userRoutes);
app.use(`${baseURL}/products`, productRoutes);
app.use(`${baseURL}/orders`, orderRoutes);
app.use(`${baseURL}/payments`, paymentRoutes);
app.use(`${baseURL}/subscriptions`, subscriptionRoutes);
app.use(`${baseURL}/regions`, addressRoutes);

app.use(pageNotFound);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);