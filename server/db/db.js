const mongoose = require('mongoose');

module.exports = startServer => {
    const connectDb = () => {
        mongoose.connect('mongodb://admin:Co147258369@ds125211.mlab.com:25211/mystock', { useNewUrlParser: true })
            .then(() => console.log('MongoDB has started ...'))
            .catch(err => console.log(err.name + ': ' + err.message));
        return mongoose.connection;
    };

    connectDb()
        .on('error', console.log)
        .on('disconnected', connectDb)
        .once('open', startServer);
};
