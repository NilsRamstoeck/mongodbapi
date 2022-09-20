import { MongoClient } from 'mongodb';
import { mongodb_config } from '../.config.json';

const client = new MongoClient(buildMongoURLFromConfig(mongodb_config));

function buildMongoURLFromConfig(config: { port: number | string; host: string; user: string; pass: string; }): string {
    const { user, pass, host, port } = config;
    return `mongodb://${user}:${pass}\@${host}:${port}`
}

const DATABASE = 'database';
const COLLECTION = 'collection';

export async function validateDatabase() {
    //Ensure username unique index
    try {
        await client.connect()

        await client
            .db(DATABASE)
            .collection(COLLECTION)
            .createIndex({
                guildId: 1
            }, {
                unique: true
            })
    }
    catch (e) {
        console.error(e);
    }
}
