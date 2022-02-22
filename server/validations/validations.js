const Joi = require('joi');
const { USER_SCHEMA, LOGIN_SCHEMA } = require("./modals");

module.exports = {
    USER_VALIDATION: async (req, res, next) => {
        try {
            const validation = await USER_SCHEMA.validateAsync(req.body);
            
            if (validation.details)
                return res.status(400).json({ message: "Invalid credential" });

            next();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Process failed" });
        }
    },

    LOGIN_VALIDATION: async (req, res, next) => {
        try {
            const validation = await LOGIN_SCHEMA.validateAsync(req.body);
            
            if (validation.details)
                return res.status(400).json({ message: "Invalid credential" });

            next();
        } catch (err) {
            console.error(err);
            return res.status(500).json({});
        }
    },
}