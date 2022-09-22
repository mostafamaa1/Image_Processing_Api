import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

// Get duration in milliseconds function
const getDurationInMs = (start: [number, number]): number => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

// middleware logger that shows timestamp, request method, endpoint and status
const logger = (req: Request, res: Response, next: NextFunction): void => {
  //middleware function
  const current_datetime = new Date();
  const formatted_date =
    current_datetime.getFullYear() +
    '-' +
    (current_datetime.getMonth() + 1) +
    '-' +
    current_datetime.getDate() +
    ' ' +
    current_datetime.getHours() +
    ':' +
    current_datetime.getMinutes() +
    ':' +
    current_datetime.getSeconds();
  const method = req.method;
  const url = req.url;
  const status = res.statusCode;
  const start = process.hrtime();
  const durationInMs = getDurationInMs(start);
  const log = `[${formatted_date}] ${method}:${url} ${status} ${durationInMs.toLocaleString()} ms`;
  console.log('logger \t');
  console.log(log);
  fs.appendFile('request_logs.txt', log + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
};

export default logger;
