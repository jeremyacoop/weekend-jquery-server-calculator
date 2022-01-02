console.log('js');

$(document).ready(handleReady);

let numOperator = '';

function handleReady() {
    console.log('jQuery is ready');
    $('.number-operator').on('click', getOperator);
    //$('#calc-subtract').on('click', getOperator);
    $('#calc-solve').on('click', collectData);
    $('#calc-clear').on('click', function() {
        console.log('clear button');
    })
}

function getOperator() {
    console.log('in getOperator');
    numOperator = $(this).text();
    console.log('operator: ', numOperator)
}

function collectData() {
    console.log('in collectData');
    console.log($('#first-number').val());
    console.log($('#second-number').val());
    //console.log($('#calc-add').val());
    //console.log($('#calc-subtract').val());
    //console.log($('#calc-multiply').val());
    //console.log($('#calc-divide').val());
    console.log($('.number-operator').val());
    console.log(numOperator);

    let numOne = $('#first-number').val();
    console.log(numOne);
    let numTwo = $('#second-number').val();
    console.log(numTwo);

    let numData = {
        numberOne: numOne,
        numberTwo: numTwo,
        numberOperator: numOperator,
        solution: 0
    }
    console.log(numData);
    return numData;
}