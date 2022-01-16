# ProblemSetGenerator
A Node.js web application that generates unique problem sets with variable parameters.

## Description
This project was made to resolve the issue of unchanging problem sets. It uses [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/), and [EJS](https://ejs.co/) to serve users dynamically generated problem sets.

Educators or students can run this application to generate a virtually infinite amount of unique problem sets. Problem sets should be provided and configured by the server host, using the [sample files](https://github.com/benwang2/ProblemSetGenerator/tree/main/psets) as a template.

## Getting Started
To get a local copy of this project up and running, follow these simple example steps.

### Prerequisites
- [npm](https://www.npmjs.com/)
- [Node.js](https://nodejs.org/)

### Installing
You must install the following dependencies.
- Express
    ```sh
    npm install express --save
    ```
- EJS
    ```sh
    npm install ejs
    ```

## Usage
Run the application with the following script.
```sh
node app.js
```

By default, the application will be served at `localhost:3000`.

## Configuration

Problem sets are saved in JSON files and are formatted as such
```json
[
    "true",
    "Basic addition and subtraction",
    {
        "problem":"What is __x__+__y__?",
        "variables":[
            ["x",1,9],
            ["y",1,9]
        ],
        "solution":"x+y"
    },
    ...
    {
        "problem":"What is __x__-__y__?",
        "variables":[
            ["x",5,10],
            ["y",1,5]
        ],
        "solution":"x-y"
    }
]
```

The first value, `true`, dictates whether or not this problem set will be displayed as an option for users.

The second value, `Basic addition and subtraction`, is the title of the problem set.

Any consequent objects hold data for various problems. Variable names for problems should be surrounded with double underscores, as displayed below. Variables can have 3 or 4 parameters,
- variable name
- minimum value
- maximum value
- interval, defaults to 1
```json
{
    "problem":"What is __x__+__y__?",
    "variables":[
        ["x",1,9],
        ["y",1,9]
    ],
    "solution":"x+y"
}
```
