import express, { Request, Response } from 'express';
import resizeImg from '../../utils/imageprocess';
import path from 'path';
import fs from 'fs';
import logger from '../../middlewares/logger';

const images = express.Router();

// Images route
images.get(
  '/',
  logger,
  async (req: Request, res: Response): Promise<unknown> => {
    //Create query param
    const { filename, width, height } = req.query;

    // Creating thumbnails folder and check if folder exists
    const thumbPath = path.join(__dirname, '../../../images/thumb');
    const thumbExists = fs.existsSync(thumbPath);
    try {
      if (!thumbExists) {
        fs.mkdirSync(thumbPath);
      }
    } catch (err) {
      console.error(err);
    }

    // original image path
    const originalImgPath = path.resolve(
      __dirname,
      '../../../images/original',
      `${filename as string}.jpg`
    );
    // processed image path
    const processedImgPath = path.resolve(
      __dirname,
      '../../../images/thumb',
      `${filename as string}_${width}_${height}.jpg`
    );

    // check if original image exists or not
    const originalImgExists = fs.existsSync(originalImgPath);
    if (!originalImgExists) {
      return res.send('An Image with this name does not exist!');
    }

    try {
      // check if processed image exists
      const processedImgExists = fs.existsSync(processedImgPath);

      // if the image does not exist, resize it
      if (!processedImgExists) {
        await resizeImg({
          width: +(width as string) as number,
          height: +(height as string) as number,
          originalImgPath,
          processedImgPath,
        });
      }
      //send the processed image
      return res.sendFile(processedImgPath);
    } catch (err) {
      return 'Cannot resize image. Please enter valid parameters';
    }
  }
);

export default images;
