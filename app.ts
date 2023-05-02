import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './src/http';
import logger from './src/utils/logger';
import { MongoDB } from './src/db/mongo';

export class Server {

    private app: Application;
    private port;
    private apiPath: string = "/api"

    constructor() {
        this.app = express();
        this.port = process.env.PORT!;
        this.middlewares();
        this.router();
        this.initDB();
    };

    private initDB() {
        MongoDB.connectToDatabase();
    };

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({ extended: false }));
    };

    private router() {
        this.app.use(this.apiPath, router)
    };


    listen() {
        this.app.listen(this.port, () => {
            logger.info(`Server on port ${process.env.PORT}`)
        })
    };
};