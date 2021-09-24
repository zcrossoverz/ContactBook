module.exports = (mongoose) => {
    let schema = mongoose.Schema(
        {
            name: {
                type: String,
                require: [true, 'Contact name is required']
            },
            email: {
                type: String,
                trim: true,
                lowercase: true
            },
            address: String,
            phone: String,
            favorite: Boolean
        },
        {
            timestamps: true
        }
    );
    // replace _id with id and remove __v
    schema.method('toJSON', function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model('contact', schema);
}