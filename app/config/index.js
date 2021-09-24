const config = {
    app: {
        port: process.env.PORT || 8080,
        origins: [
            'http://localhost:8081'
        ]
    },
    db: {
        url: 'mongodb://localhost:27017/contactbook'
    }
};

module.exports = config;