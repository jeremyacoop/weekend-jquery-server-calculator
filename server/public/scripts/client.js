console.log('js');

$(document).ready(handleReady);

function handleReady() {
    console.log('jQuery is ready');
    $('#calc-solve').on('click', function() {
        console.log('equals button');
    })
    $('#calc-clear').on('click', function() {
        console.log('clear button');
    })
    }

