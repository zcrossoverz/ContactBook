// create and save new contact
exports.create = async (req, res) => {
    res.send({ message: 'Create handle' });
};

// retrieve all contact
exports.findAll = async (req, res) => {
    res.send({ message: 'findAll handle' });
};

// find one contact with id
exports.findOne = async (req, res) => {
    res.send({ message: 'findOne handle' });
};

// update contact by id
exports.update = async (req, res) => {
    res.send({ message: 'update handle' });
};

// delete contact by id
exports.delete = async (req, res) => {
    res.send({ message: 'delete handle' });
};

// delete all contact
exports.deleteAll = async (req, res) => {
    res.send({ message: 'deleteAll handle' });
};

// find all favorite contacts of a user
exports.findAllFavorite = async (req, res) => {
    res.send({ message: 'findAllFavorite handle' });
};