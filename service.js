import * as messages from './util/messages.js';

/*
 * POST /echo 
    Return the matrix as a string in matrix format
 */
function echo(req, res) {
  const data = req.data;
  res.send(data + '\n');
}

/*
 * POST /invert 
    Return the matrix as a string in matrix format 
    where the columns and rows are inverted
 */
function invert(req, res) {
  const data = req.data;
  const rows = data.split('\n');
  let matrix = [];
  let colsSize = 0;
  for (let i = 0; i < rows.length; i++) {
    let cols = rows[i].split(',');
    colsSize = cols.length;
    matrix.push(cols);
  }

  let inverted = [];
  let invertedString = '';
  for (let i = 0; i < rows.length; i++) {
    inverted[i] = [];
    let invertedRow = '';
    for (let j = 0; j < colsSize; j++) {
      inverted[i][j] = matrix[j][i];
      invertedRow = invertedRow + matrix[j][i].toString() + ',';
    }
    invertedString =
      invertedString + invertedRow.substring(0, invertedRow.length - 1) + '\n';
  }

  res.send(invertedString);
}

/*
 * POST /flatten
        Return the matrix as a 1 line string, 
        with values separated by commas.
 */
function flatten(req, res) {
  let data = req.data;
  data = data.replace(new RegExp('[\r\n]', 'gm'), ',');
  res.send(data);
}

/*
 * POST /sum
        Return the sum of the integers in the matrix
 */
function sum(req, res) {
  let data = req.data;
  data = data.replace(new RegExp('[\r\n]', 'gm'), ',');
  let splits = data.split(',');
  let result = splits.reduce((accumulator, current) => {
    return accumulator + Number(current);
  }, 0);
  if (result >= Number.MAX_VALUE || result <= Number.NEGATIVE_INFINITY) {
    res.status(422).send(messages.outOfBound);
    return;
  }
  res.send(result.toString());
}

/*
 * POST /multiply
        Return the product of the integers in the matrix
 */
function multiply(req, res) {
  let data = req.data;
  data = data.replace(new RegExp('[\r\n]', 'gm'), ',');
  let splits = data.split(',');
  let result = splits.reduce((accumulator, current) => {
    return accumulator * Number(current);
  }, 1);
  if (
    result == Number.POSITIVE_INFINITY ||
    result == Number.NEGATIVE_INFINITY
  ) {
    res.status(422).send(messages.outOfBound);
    return;
  }
  res.send(result.toString());
}

export { echo, invert, flatten, sum, multiply };
