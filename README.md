## Problem Statement

Given an uploaded csv file

```
1,2,3
4,5,6
7,8,9
```

1. Echo (given)

   - Return the matrix as a string in matrix format.

   ```
   // Expected output
   1,2,3
   4,5,6
   7,8,9
   ```

2. Invert
   - Return the matrix as a string in matrix format where the columns and rows are inverted
   ```
   // Expected output
   1,4,7
   2,5,8
   3,6,9
   ```
3. Flatten
   - Return the matrix as a 1 line string, with values separated by commas.
   ```
   // Expected output
   1,2,3,4,5,6,7,8,9
   ```
4. Sum
   - Return the sum of the integers in the matrix
   ```
   // Expected output
   45
   ```
5. Multiply
   - Return the product of the integers in the matrix
   ```
   // Expected output
   362880
   ```

The input file to these functions is a matrix, of any dimension where the number of rows are equal to the number of columns (square). Each value is an integer, and there is no header row. matrix.csv is example valid input.

## Operational Limits

Max matrix size and file upload size are set in `.env` file. Those can be adjusted as needed

## Test Cases Handled

1. correctness of `echo`, `invert`, `flatten`, `sum` and `multiply` operations
2. valid input for square matrix with only integers
3. enforce operational limits
4. verify integer bounds

## Running Locally

1.                 npm install
2.                 npm run dev
3.                 curl -F 'file=@example/matrix.csv' "localhost:3000/echo"

### Running with docker

         docker build . -t adi/league

         docker run -p 3000:8080 -d adi/league

         # Get container ID
         $ docker ps

         # Print app output
         $ docker logs <container id>

         # You should see
         Listening on port:3000

         # Enter the container
         $ docker exec -it <container id> /bin/bash

         # Try health check
         curl "localhost:3000/health-check"
         # You should see
         OK!

         # Curl the matrix operations endpoints
         # Note the matrix test file lives in example directory
         curl -F 'file=@example/matrix.csv' "localhost:3000/echo"

### Run Tests

    npm run test
