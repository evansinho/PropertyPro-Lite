import express from 'express';
import 'babel-polyfill';
import path from 'path';
import Property from './routes/property';
import Users from './routes/users';

// Instantiate the app
const app = express(); 

// Define our app port.
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../UI/')));

app.use('/api/v1/auth', Users);
app.use('/api/v1/property',Property);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message, status: 'failure' });
  next();
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;