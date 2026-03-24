import express from 'express';

const authApp = express();

const port = 3000;

authApp.use(express.json());


authApp.get('/', (req , res) => {
    res.send('auth app');
});

authApp.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})