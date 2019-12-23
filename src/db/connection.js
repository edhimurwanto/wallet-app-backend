import { createConnection as connect } from 'typeorm';
import entities from './entities';

async function createConnection() {
    const connection = await connect({
        type: 'mysql',
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: '',
        database: 'db_cinema',
        synchronize: true,
        logging: false,
        entities: Object.values(entities),
    });

    return connection;
}

export default createConnection;