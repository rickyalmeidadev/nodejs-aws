import 'dotenv/config';
import './database/connect.js';
import 'express-async-errors';
import express from 'express';
import * as Middlewares from './middlewares/error.js';
import * as Routes from './routes.js';

const app = express();

app.use(express.json());
app.use(Routes.router);
app.use(Middlewares.error);

app.listen(3000);
