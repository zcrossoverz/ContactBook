const contacts = require('../controllers/contact.controller');
const express = require('express');

module.exports = (app) => {
    let router = express.Router();

    // create new contact
    router.post('/', contacts.create);

    // retrieve all contacts
    router.get('/', contacts.findAll);

    // retrieve all favorite contacts
    router.get('/favorite', contacts.findAllFavorite);

    // retrieve single contact with id
    router.get('/:id', contacts.findOne);

    // update a contact with id
    router.put('/:id', contacts.update);

    // delete a contact with id
    router.delete('/:id', contacts.delete);

    // delete all contact 
    router.delete('/', contacts.deleteAll);

    app.use('/api/contacts', router);

}