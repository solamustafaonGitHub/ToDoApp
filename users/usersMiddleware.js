//user middleware
//validate user creation and login
// const validateUserCreation = async (req, res, next) => {
//     try {
//         const schema = joi.object({
//             name: joi.string().required().min(3).messages({
//                 'string.min': 'Name must be at least 3 characters long',
//                 'any.required': 'Name is required',
//             }),
//             email: joi.string().email().required().messages({
//                 'string.email': 'Invalid email format',
//                 'any.required': 'Email is required',
//             }),
//             password: joi.string().min(6).required().messages({
//                 'string.min': 'Password must be at least 6 characters long',
//                 'any.required': 'Password is required',
//             }),
//         });

//         console.log(req.body);
//         await schema.validateAsync(req.body, { abortEarly: true });
//         next();

//     } catch (err) {
//         console.log(err);
//         return res.status(422).json({ 
//             message: err.message, 
//             success: false });
//     }
// };

// const validateUserLogin = async (req, res, next) => {
//     try {
//         const schema = joi.object({
//             password: joi.string().required(),
//             email: joi.string().email().required(),
//         });

//         console.log(req.body);
//         await schema.validateAsync(req.body, {abortEarly: true });
//         next();

//     } catch (error) {
//         console.log(error);
//         return res.status(422).json({ 
//             message: error.message, 
//             success: false });
//     }
// };
