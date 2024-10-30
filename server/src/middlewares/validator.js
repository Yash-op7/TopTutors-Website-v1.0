import Joi from "joi";

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    contactNumber: Joi.string().required(),
});

export const validateNewUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Invalid data values for new user's data fields.",
            error: error.details,
        });
    }
    next();
};
