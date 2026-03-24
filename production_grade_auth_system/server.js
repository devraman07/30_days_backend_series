import express from 'express';
import { authRouter } from './routes/authroutes.js';

const authApp = express();

const port = 3000;

authApp.use(express.json());


authApp.use('/api/auth', authRouter);


authApp.get('/', (req , res) => {
    res.send('auth app');
});

authApp.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})