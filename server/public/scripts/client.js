console.log('js', 6 / 3);

$(document).ready(handleReady);

let numOperator = '';

function handleReady() {
    console.log('jQuery is ready');
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
    //console.log($('#first-number').val());
    //console.log($('#second-number').val());
    //console.log($('#calc-add').val());
    //console.log($('#calc-subtract').val());
    //console.log($('#calc-multiply').val());
    //console.log($('#calc-divide').val());
    //console.log($('.number-operator').val());
    console.log(numOperator);

    let numOne = $('#first-number').val();
    //console.log(numOne);
    let numTwo = $('#second-number').val();
    //console.log(numTwo);

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
        getMathSolution();
    }).catch(function(err) {
        alert('Server unable to respond');
    });
}

function getMathSolution() {
    console.log('In getMathSolution');
    $.ajax({
        method: 'GET',
        url:    '/calculator'
    }).then( function(response) {
        $('#solution-here').empty();
        console.log(response[response.length-1].solution);
        // print calculator history to DOM
        //$('#solution-here').append(response[response.length-1].solution);
        for(let i=response.length-1; i>=0; i--) {
            $('#solution-here').append(`
                <p>
                ${response[i].numberOne} 
                ${response[i].operator} 
                ${response[i].numberTwo} =
                ${response[i].solution} 
                </p>
            `);

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