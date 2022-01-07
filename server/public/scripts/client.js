console.log('js');

$(document).ready(handleReady);

let numOperator = '';

function displayCalcHistory(solutionHistory) {
        // print calculator history to DOM
        $('#solution-here').empty();
        if(solutionHistory[solutionHistory.length-1].solution != undefined) {
        $('#solution-here').append(solutionHistory[solutionHistory.length-1].solution);
        }
        $('#calc-history').empty();
        for(let i=solutionHistory.length-1; i>=0; i--) {
            $('#calc-history').append(`
                <li>
                ${solutionHistory[i].numberOne} 
                ${solutionHistory[i].operator} 
                ${solutionHistory[i].numberTwo} =
                ${solutionHistory[i].solution} 
                </li>
            `);
        }
}

function handleReady() {
    console.log('jQuery is ready');
    refreshCalcHistory();
    $('.number-operator').on('click', getOperator);
    $('#calc-solve').on('click', sendMathProblem);
    $('#calc-clear').on('click', clearInputs);
    
}

function getOperator() {
    console.log('in getOperator');
    numOperator = $(this).text();
    console.log('operator: ', numOperator)
}

function collectData() {
    console.log('in collectData');
    console.log(numOperator);

    let numOne = $('#first-number').val();
    let numTwo = $('#second-number').val();

    let numData = {
        numberOne: numOne,
        numberTwo: numTwo,
        operator: numOperator,
        solution: 0
    }
    console.log(numData);
    return numData;
}

function sendMathProblem(problemToSend) {
    console.log('in sendMathProblem');
    console.log(problemToSend);
    problemToSend = collectData();
    console.log(problemToSend);
    $.ajax({
        method: 'POST',
        url:    '/calculator',
        data:   problemToSend
    }).then( function(response) {
        //getMathSolution();
        refreshCalcHistory();
    }).catch(function(err) {
        alert('Server unable to respond');
    });
}

function refreshCalcHistory() {
    console.log('In refreshCalcHistory');
    $.ajax({
        method: 'GET',
        url:    '/calculator'
    }).then( function(response) {
        if(response[response.length-1] != undefined) {
        displayCalcHistory(response);
        }
    }).catch(function(err) {
        alert('Server unable to respond');
    });
}

function clearInputs() {
    $('#first-number').val('');
    $('#second-number').val('');
    $('.number-operator').val('');
}