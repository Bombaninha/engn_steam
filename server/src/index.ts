import 'reflect-metadata';

import swaggerUi from "swagger-ui-express";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import './database/';

import { router }  from './routes';

import cors from "cors";

import swaggerDocs from "./swagger.json";

import { BlankFieldError } from './exceptions/BlankFieldError';
import { DuplicatedRegisterError } from "./exceptions/DuplicatedRegisterError";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/terms", (request: Request, response: Response) => {
    return response.json({
        message: "Termos de Serviço"
    });
});

app.use("/v1", router);

app.use((err: Error | BlankFieldError | DuplicatedRegisterError, request: Request, response: Response, next: NextFunction) => {

    switch (err.constructor) {
        case BlankFieldError:
            return response.status(400).json({
                error: err.message
            });
        case DuplicatedRegisterError:
            return response.status(422).json({
                error: err.message
            });            
        case Error:
            return response.status(400).json({
                error: err.message
            });
        default:
            return response.status(500).json({
                status: "error",
                message: "Internal Server Error"
            });
    }
});

app.listen(4000, () => console.log("Server started at http://localhost:4000"));
