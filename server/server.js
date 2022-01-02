const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

const PORT = 5000;
app.listen(PORT, () => {
    console.log('server up on port', PORT);
    })

let mathStatement = {};
let calcHistory = [];

function mathCalculate(mathProblem) {
    console.log('In mathCalculate');
    if(mathProblem.operator === '+') {
        mathProblem.solution = mathProblem.numberOne + mathProblem.numberTwo;
    }else if(mathProblem.operator === '-') {
        mathProblem.solution = mathProblem.numberOne - mathProblem.numberTwo;
    }else if(mathProblem.operator === '*') {
        mathProblem.solution = mathProblem.numberOne * mathProblem.numberTwo;
    }else if(mathProblem.operator === '*') {
        mathProblem.solution = mathProblem.numberOne / mathProblem.numberTwo;
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
})