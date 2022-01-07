const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

//const PORT = 5000;
const PORT = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('server up on port', port);
    })

let mathStatement = {};
let calcHistory = [];

function mathCalculate(mathProblem) {
    console.log('In mathCalculate');
    if(mathProblem.operator === '+') {
        mathProblem.solution = Number(mathProblem.numberOne) + Number(mathProblem.numberTwo);
    }else if(mathProblem.operator === '-') {
        mathProblem.solution = Number(mathProblem.numberOne) - Number(mathProblem.numberTwo);
    }else if(mathProblem.operator === '*') {
        mathProblem.solution = Number(mathProblem.numberOne) * Number(mathProblem.numberTwo);
    }else if(mathProblem.operator === '/') {
        mathProblem.solution = Number(mathProblem.numberOne) / Number(mathProblem.numberTwo);
    }
    console.log(mathProblem.solution);
    return mathProblem;
}

app.post('/calculator', (req, res) => {
    console.log('In /calculator POST', req.body);
    mathStatement = req.body;
    mathCalculate(mathStatement);
    calcHistory.push(mathStatement);
    console.log(calcHistory);
    res.sendStatus(201);
});

app.get('/calculator', (req, res) => {
    console.log('In /calculator GET');
    console.log(calcHistory);
    res.send(calcHistory);
});