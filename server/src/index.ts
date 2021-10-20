import 'reflect-metadata';

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import './database/';

import { router }  from './routes';

import cors from "cors";

const app = express();

app.get('/', (request: Request, response: Response) => {
    response.send({ message: "aaa" });
});

app.use(cors());

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return response.status(400).json({
            error: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});

app.listen(4000, () => console.log("Server started at http://localhost:4000"));
