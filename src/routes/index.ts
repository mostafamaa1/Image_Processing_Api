import express, { Request, Response } from 'express';
import images from './api/imagesResize';
import inputValidate from '../middlewares/validateInputs';

const routes = express.Router();

// api route
routes.get('/', (req: Request, res: Response): void => {
  res.send('Main route');
});

// images list route
routes.get('/imageslist', (req: Request, res: Response): void => {
  res.json({
    image1: 'encenadaport',
    image2: 'fjord',
    image3: 'icelandwaterfall',
    image4: 'palmtunnel',
    image5: 'santamonica',
  });
});

// using images route
routes.use('/images', inputValidate, images);

export default routes;
