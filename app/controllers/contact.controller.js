const { BadRequestError, handle } = require("../helpers/errors");
const { Contact } = require("../models");

// create and save new contact
exports.create = async (req, res, next) => {
    // validate request
    if(!req.body.name){
        return next(new BadRequestError(400, 'Name can not be empty'));
    }
    // create a contact
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        favorite: String(req.body.favorite).toLowerCase() == "true"
    });
    // save to db
    const [error, data] = await handle(contact.save());

    if(error){
        return next(new BadRequestError(500, 'An error occured while creating the contact'));
    }

    return res.send(data);
}

// retrieve all contact
exports.findAll = async (req, res, next) => {
    let condition = {};
    const name = req.query.name;
    if(name){
        condition.name = { $regex: new RegExp(name), $options: 'i' };
        // options i == ko phan biet hoa thuong
    }
    const [error, data] = await handle(Contact.find(condition));
    if(error){
        return next(new BadRequestError(500, 'An error occured while retrieving contacts'));
    }

    return res.send(data);
};

// find one contact with id
exports.findOne = async (req, res, next) => {
    const condition = {
        _id: req.params.id
    };
    const [error, data] = await handle(Contact.findOne(condition));
    if(error){
        return next(new BadRequestError(500, `Error when retrieving contacts with id=${req.params.id}`));
    }
    if(!data){
        return next(new BadRequestError(404, 'Resource not found'));
    }
    return res.send(data);
};

// update contact by id
exports.update = async (req, res, next) => {
    if(!req.body){
        return next(new BadRequestError(400, 'Data to update can not be empty'));
    }
    const condition = {
        _id: req.params.id
    };
    const [error, data] = await handle(Contact.findOneAndUpdate(condition, req.body, {
        new: true
    }));
    if(error){
        return next(new BadRequestError(500, `Error updating contact with id=${req.params.id}`));
    }
    if(!data){
        return next(new BadRequestError(404, 'Resource not found'));
    }
    return res.send({ message: 'Contact was update successfully' });
};

// delete contact by id
exports.delete = async (req, res, next) => {
    const condition = {
        _id: req.params.id
    };
    const [error, data] = await handle(Contact.findOneAndDelete(condition));
    if(error){
        return next(new BadRequestError(500, `Could not delete contact with id=${req.params.id}`));
    }
    if(!data){
        return next(new BadRequestError(404, `Not found contact with id=${req.params.id}`));
    }
    return res.send({ message: 'Contact was deleted successfully'});
};

// delete all contact
exports.deleteAll = async (req, res, next) => {
    const [error, data] = await handle(Contact.deleteMany({}));
    if(error){
        return next(new BadRequestError(500, 'An error ocurred while removing all contacts'));
    }
    return res.send({
        message: `${data.deletedCount} contacts were deleted successfully`
    });
};

// find all favorite contacts of a user
exports.findAllFavorite = async (req, res, next) => {
    const [error, data] = await handle(Contact.find({ favorite: true }));
    if(error){
        return next(new BadRequestError(500, 'An error ocurred while retrieving favorite contacts'));
    }
    return res.send(data);
};