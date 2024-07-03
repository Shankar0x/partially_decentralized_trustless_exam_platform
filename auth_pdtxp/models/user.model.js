const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('config');

const UserSchema = new mongoose.Schema({
    eno: {
        type: String,
        required: true,
        unique: true,
    },
    pass: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    pfp: {
        type: String,
        required: true,
    },
}, {
    collection: 'authCollections' 
});

UserSchema.pre('save', async function (next) {
    let user = this;
    if (!user.isModified('pass')) return next();

    const salt = await bcrypt.genSalt(config.get('saltFactor'));
    const hash = await bcrypt.hash(user.pass, salt);
    user.pass = hash;
    return next();
});

UserSchema.methods.comparePassword = async function(usrPass) {
    const user = this;
    return bcrypt.compare(usrPass, user.pass).catch((e) => false);
};


const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
