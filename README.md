# Lisp to JS Transpiler
It accepts LISP programming code and convert it into equivalent JS code.

### Requirements
* [NPM](https://www.npmjs.com/)

### Installing Dependencies
```
 npm install
```
`npm install` will install the necessary modules.

### Running
```
`npm start`
``` 
`npm start` should be used during development. It creates a a new local server on port 4000.

### Tests
```
`npm run test`
``` 

## Server API

### `POST /api/v1/isValidLisp`
Verifies if the LISP code passed is syntactically correct?

```
curl -X POST \
  http://localhost:4000/api/v1/isValidLisp \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: abc85838-d262-421a-aafe-de6a4422d600' \
  -H 'cache-control: no-cache' \
  -d '{
	"data": "(setq x (- 200 50));"
}'
```

### `POST /api/v1/convertToJS`
Converts the LISP code passed into JS code, iff syntactically correct?

```
curl -X POST \
  http://localhost:4000/api/v1/convertToJS \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 4e50c3f1-b766-4364-949d-f23f8cb109b6' \
  -H 'cache-control: no-cache' \
  -d '{
	"data": "(setq x (+ 2 3));"
}'
```

## Examples
Please refer the following examples for reference

```
(seqt a 8) // a=8
(seqt a (* 9 10)) // a=9*10
(seqt a (* 9 10))) // Invalid (because of an extra parenthesis at the end)
```

##

