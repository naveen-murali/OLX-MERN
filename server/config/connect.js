const MongoClient = require('mongodb').MongoClient;

const status = {
    db: null
}

const connect = async () => {
    try {
        const client = new MongoClient(process.env.MONGODB_URL);
        const connect = await client.connect();
        const db = connect.db(process.env.DB_NAME);
        status.db = db;

        console.log("MONGODB => [CONNECTION SUCCESS]");
    } catch (err) {
        console.log(err);
        console.log("MONGODB => [CONNECTION FAILD]");
    }
}

module.exports = { connect, get: () => status.db };