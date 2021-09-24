const mongoose = require('mongoose');
const createContactModel = require('./contact.model');


const db = {};

db.mongoose = mongoose;
db.Contact = createContactModel(mongoose);

module.exports = db;