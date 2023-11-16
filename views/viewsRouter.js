const express = require('express');
const userServices = require('./routes/users');
const taskServices = require('./routes/tasks'); 

const router = express.Router();
router.use(cookieParser());

//create an express app
const app = express();

app.use('view engine', 'ejs');
app.use('views', './views')

// GET home page
router.get('/', (req, res) => {
console.log("Home Page Rendered");
res.render('index');
});

// GET login page
router.get('/login', (req, res) => {
console.log("Login Page Rendered");
res.render('login');
});

// GET signup page
router.get('/signup', (req, res) => {
console.log("Signup Page Rendered");
res.render('signup', {user: req.user});
});

//POST signup page
router.post('/signup', async (req, res) => {
  try {
    const response = await userServices.Signup({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
 console.log(response);

    if (response.success) {
        console.log("User created");
        res.redirect("login");
    } else {
      console.log("User not created");
      const message = response.message;
        res.render("signup", { message, user: req.user })   
    }
} catch (error) {
  console.log(error);
  res.status(500).json({
    success: false,
    message: error.message,
  });
}
});

// POST login page
router.post('/login', async (req, res) => {
    try{
        const response = await userServices.Login({
            email: req.body.email,
            password: req.body.password,
        });
        console.log(response);

        if (response.success) {
           console.log("User logged in");
           res.cookie('jwt', response.data.token, { httpOnly: true, maxAge: 3600000 });
           res.redirect('/tasks');
        } else {
            console.log("User not logged in");
            const message = response.message;
            res.render('login', { message, user: req.user });
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

//authenticating the user
router.use((req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        console.log("You are Authenticated");
       try{
        const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = decodedValue;
        next();
       } catch(error) {
        res.redirect('/views/login');
       }
    } else {
        res.redirect('/views/login');
    }
});

//logout
router.get('/logout', (req, res) => {
    console.log("User logged out");
    res.clearCookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
});

// GET tasks page
router.get('/tasks', async (req, res) => {
    const user_id = res.locals.user.id;

    const response = await taskServices.getAllTasks(user_id);
    console.log(response);
    res.render('tasks', { 
    tasks: response.data, user: req.user }
    );
console.log({user: res.locals.user});
console.log(response);
});

//GET tasks page=completing a task
router.get('/task/completed/', async (req, res) => {
    const user_id = res.locals.user.id;
  
    const response = await taskService.getCompletedTasks(user_id);
  
    res.render('task', { 
      user: res.locals.user, 
      tasks: response.data.tasks
    });
  
    console.log({ user: req.user });
    console.log(response);
  })
  router.get('/task/pending/', async (req, res) => {
    const user_id = res.locals.user.id;
  
    const response = await taskService.getPendingTasks(user_id);
  
    res.render('task', { 
      user: res.locals.user, 
      tasks: response.data.tasks
    });
  
    console.log({ user: req.user });
    console.log(response);
  })
   
  router.get('/task/create/', (req, res) => {
    res.render('taskcreate')
  } )
  
  router.post('/task/create/', async (req, res) => {
    console.log({ body : req.body })
    req.body.user_id = res.locals.user.id;
    console.log({ body : req.body.user_id })
    const response = await taskService.createTask(req.body);
  
  
    if (response.code === 200) {
        res.redirect('/task')
    } else {
        res.render('taskcreate', { error: response.message })
    }
  })

  module.exports = router;
  