import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';

const app: Application = express();

// cors
app.use(cors());

// parser
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api
app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
    res.send({
        message: "LibroPrisma server..."
    })
});

// middleware
app.use(globalErrorHandler);
app.use(notFound);

export default app;