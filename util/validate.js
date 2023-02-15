var isInt = function (n) {
  return !Number.isNaN(Number.parseInt(n)) && Number.isInteger(Number(n));
};

export function isValidInput(data) {
  const rows = data.split('\n');
  for (let i = 0; i < rows.length; i++) {
    let cols = rows[i].split(',');
    if (
      rows.length > process.env.MATRIX_SIZE ||
      rows.length != cols.length ||
      !cols.every((element) => {
        return isInt(element);
      })
    ) {
      return false;
    }
  }
  return true;
}
