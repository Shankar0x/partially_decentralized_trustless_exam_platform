const validateResource = (schema) => async (req, res, next) => {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };

    try {
        await schema.validateAsync(req.body, options);
        next(); 
    } catch (e) {
        return res.status(400).json(e.details); 
    }
};

module.exports = validateResource;
