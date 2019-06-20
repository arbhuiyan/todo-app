const mongoose = require('mongoose');
const server = '192.168.56.102:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'tasks';      // REPLACE WITH YOUR DB NAME
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