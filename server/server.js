import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import searchRoutes from './routes/search.js';
import teamRoutes from './routes/teams.js'

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use('/search', searchRoutes);
app.use('/teams', teamRoutes);

const PORT = 5000;

try {
    app.listen(PORT, () => {
        console.log(`Server running on port : ${PORT}`);
    });
} catch (error) {
    console.log(error);
}