import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/router';
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use('/', routes);

app.get('/', (req: any, res: any) => {
    return res.json({message: "Hello World"});
});

app.listen(port, () => {
    console.log(`[server]: Server is running at port ${process.env.PORT}`);
})