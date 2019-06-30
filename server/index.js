import 'babel-polyfill';
import express from 'express';
import path from 'path';
import User from './controllers/userController';
/*import router from './routes';*/

// Instantiate the app
const app = express(); 

// Define our app port.
const port = process.env.PORT || 3000;

/*app.use(router);*/
app.use(express.json());

app.post('/api/v1/auth/signup', User.signUp);
app.post('/api/v1/auth/signin', User.signIn);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;