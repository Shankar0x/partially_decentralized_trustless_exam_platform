const userModel = require("../models/user.model");
const { omit } = require("lodash");

const validateUser = async (user) => {
    const usr = await userModel.findOne({ eno: user.eno });
    if (!usr) return false;
    else console.log("Found username");

    const isValid = await usr.comparePassword(user.pass);
    if (!isValid) return false;
    return omit(usr.toJSON(), "pass");
};

module.exports = { validateUser };
