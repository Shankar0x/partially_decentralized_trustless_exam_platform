const validateResource = require("../middleware/validateResource");
const { loginUserHandler } = require("../controllers/user.controller");
const loginUserSchema = require("../schemas/user.schema");

const userRoute = (app) => {
    app.post("/user/login", validateResource(loginUserSchema), loginUserHandler);
};

module.exports = userRoute;
