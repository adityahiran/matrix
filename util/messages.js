import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const invalidArgument = `Should be a square matrix with only integers and max allowed size of ${process.env.MATRIX_SIZE}\n`;

const outOfBound = 'Result out of bound\n';

const fileTooBig = `File too big. max allowed size is ${process.env.MAX_FILE_SIZE}\n`;

const intervalServerError = 'Internal server error\n';

export { invalidArgument, outOfBound, fileTooBig, intervalServerError };
