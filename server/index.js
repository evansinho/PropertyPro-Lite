import { upload } from './middleware/multer';
import 'babel-polyfill';
import express from 'express';
/*import path from 'path';*/
import User from './controllers/userController';
import Property from './controllers/propertyController';
/*import router from './routes';*/

// Instantiate the app
const app = express(); 

// Define our app port.
const port = process.env.PORT || 3000;

/*app.use(router);*/
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/api/v1/auth/signup', User.signUp);
app.post('/api/v1/auth/signin', User.signIn);
app.post('/api/v1/property',upload.single('image_url'), Property.create);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;