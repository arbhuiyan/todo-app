const mongoose = require('mongoose');
const server = process.env.DB_HOST + ":" + process.env.DB_PORT;
const database = 'tasks';
class Database {

    constructor() {
        this._connect()
    }
    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`, {useNewUrlParser: true, useFindAndModify: false})
        .then(() => {
            console.log('Database connection successful')
        })
        .catch(err => {
            console.error('Database connection error', err)
        });
    }
}
module.exports = new Database();