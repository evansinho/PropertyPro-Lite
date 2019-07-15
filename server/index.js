import express from 'express';
import 'babel-polyfill';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from'swagger-jsdoc';
import Property from './routes/property';
import Users from './routes/users';
import Flag from './routes/flag';


// Instantiate the app
const app = express(); 

// Define our app port.
const port = process.env.PORT || 3000;

// Swagger definition
const swaggerDefinition = {
			info: {
				title: 'PropertyPro-Lite API',
				version: '1.0.0', 
			    description:'Property Pro Lite is a platform where people can create and/or search properties for sale or rent.'
					  	},
				host: 'historic-biscayne-93397.herokuapp.com',
			    basePath: '/api/v1'
			};

const options = {swaggerDefinition,apis: ['./server/docs/docs.yaml'],};	
const swaggerSpec = swaggerJSDoc(options);		

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/auth', Users);
app.use('/api/v1/property',Property);
app.use('/api/v1/flag',Flag);


app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: 400,
    error: error.message,
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


module.exports = app;
