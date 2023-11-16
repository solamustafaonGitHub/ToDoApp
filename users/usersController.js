/ //user controller
// //create user & login user
// const signupUser = async ({name, email, password}) => {
//     try {
//         const userFromReq = {name, email, password};
//         const existingUser = await userModel.findOne({ email: userFromReq.email });

//         if (existingUser) {
//             console.log('User already exists');
//             return res.status(409).json({ message: 'User already exists', success: false });
//         }

//         const user = await userModel.create({
//             name: userFromReq.name,
//             email: userFromReq.email,
//             password: userFromReq.password,
//             created_at: new Date(),
//         });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//         if (user) {
//             console.log('User created successfully');
//             return res.status(201).json({ success: true, message: 'User created successfully', data: { user, token } });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: error.message, success: false });
//     }
// };

// const loginUser = async (req, res) => {
//     try {
//         const userFromReq = {email, password};
//         const user = await userModel.findOne({ email: userFromReq.email });

//         if (!user) {
//             console.log('User not found');
//             return res.status(409).json({ message: 'User not found', success: false });
//         }

//         const validPassword = await existingUser.validatePassword(userFromReq.password);
//         if (!validPassword) {
//             console.log('Invalid password');
//             return res.status(400).json({ message: 'Invalid password', success: false });
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//         console.log('User logged in successfully');

//         return res.status(200).json({
//             success: true,
//             message: 'User logged in successfully',
//             data: { user, token },
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };


// //authenticate user
// router.use(cookieParser());
// router.use(async (req, res, next) => {
// const token = req.cookies.jwt;
// if (token) {
//     try {
//     const decodedValue = await jwt.verify(token, process.env.JWT_SECRET);
//     res.locals.user = decodedValue
//     console.log('You are authenticated!')
//     next()
//     } catch (error) {
//     console.log('You are not authenticated!')
//     res.redirect('/login')
//         }
//     } else {
//     res.redirect('/login')
//     }
//   })

// //user routes
// //signup and login
// router.post('/signup', validateUserCreation, createUser);
// router.post('/login', validateUserLogin, loginUser);
