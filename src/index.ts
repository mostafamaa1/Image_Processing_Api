import express, { Request, Response, Application } from 'express';
import routes from './routes/index';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
// create an instance server
const app: Application = express();
// HTTP request logger middleware
app.use(morgan('dev'));

// api route
app.use('/api', routes);

// main page route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Main Page',
  });
});

// Start the Express Server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

export default app;
