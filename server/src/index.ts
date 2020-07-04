import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);
