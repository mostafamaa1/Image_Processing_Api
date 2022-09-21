import { Request, Response, NextFunction } from 'express';

//Check for image inputs
const inputValidate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { query } = req;
  const inputs = ['filename', 'width', 'height'];
  // Check if filename or width or height parameter is missing
  for (let i = 0; i < inputs.length; i++) {
    const param = inputs[i];
    const value = query[param];

    // Check if width or height value is a number or not
    if (param == 'width' || param == 'height') {
      const num = Number(value);
      //Check if values entered is less than 0
      if (num < 0) {
        res.status(400).send('Negative values cannot be processed');
        return;
      }
      if (!num) {
        res.status(400).send('Width and height should be numbers');
        return;
      }
    }
    // Check if all parameters are entered or not
    if (query[param] === undefined) {
      res.send('There is an input is missing!!');
      return;
    }
    // Check if filename value is a string or not
    if (param == 'filename' && typeof value !== 'string') {
      res.send('Image name should be a string');
      return;
    }
  }
  next();
};

export default inputValidate;
