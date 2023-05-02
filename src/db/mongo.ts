import mongoose from 'mongoose';
import logger from '../utils/logger';


export class MongoDB {
    static connectToDatabase = () => {
        return new Promise((resolve, reject) => {
            mongoose.connect(process.env.MONGO_URI!);
            const db = mongoose.connection;
            db.on('error', reject);
            db.once('open', () => {
                logger.info('Database connected')
                resolve
            });
        });
    };

};