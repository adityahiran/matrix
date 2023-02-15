import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import * as matrixOps from './service.js';
import { isValidInput } from './util/validate.js';
import * as messages from './util/messages.js';
import { errorHandler } from './util/error.js';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const upload = multer({
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) }
});

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.array('file'));

const port = 3000;

app.get('/health-check', (req, res) => {
  res.send('OK!\n\n');
});

app.use((req, res, next) => {
  const data = req.files[0].buffer.toString();
  const isValid = isValidInput(data);
  if (!isValid) {
    res.status(400).send(messages.invalidArgument);
    return;
  }
  req.data = data;
  next();
});

app.use(errorHandler);

app.route('/echo').post(matrixOps.echo);

app.route('/invert').post(matrixOps.invert);

app.route('/flatten').post(matrixOps.flatten);

app.route('/sum').post(matrixOps.sum);

app.route('/multiply').post(matrixOps.multiply);

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});

export { app }; // for testing
