const { validateUser } = require("../services/user.services");

const loginUserHandler = async (req, res, next) => {
    try {
        // Validate user credentials
        const user = await validateUser(req.body);

        // If user validation fails, return unauthorized
        if (!user) {
            return res.status(401).json({ message: "Invalid registration number or password" });
        }

        // If user validation succeeds, return success response
        return res.status(200).json({
            message: "Login Successful!",
            usrId: user._id,
            usrName: user.name,
        });
    } catch (error) {
        // Handle errors and pass to the next middleware
        console.error('Error during login:', error);
        return next(error);
    }
};

module.exports = { loginUserHandler };

