import { MongoClient } from 'mongodb';

export const dbService = {
    getCollection,
};

let dbConn = null;

// Directly embed the configuration details here
const dbURL = 'mongodb+srv://yifaht:yifaht1234@instaframedb.hdhpbyr.mongodb.net/?retryWrites=true&w=majority&appName=InstaframeDB';
const dbName = 'Instaframe_db';

async function getCollection(collectionName) {
    try {
        const db = await _connect();
        const collection = db.collection(collectionName);
        return collection;
    } catch (err) {
        console.error('Failed to get Mongo collection', err); // Use console.error for logging errors
        throw err;
    }
}

async function _connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(dbURL);
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        console.error('Cannot Connect to DB', err); // Use console.error for logging errors
        throw err;
    }
}
