document.addEventListener('DOMContentLoaded', function() {
    // game option selection
    document.querySelector('#game').addEventListener('change', function() {
        let select = document.querySelector('#game')
        let value = select.options[select.selectedIndex].value;
        if(value === 'Pokemon TCG') {
            Pokemon();
        } else if(value === 'Magic: The Gathering') {
            MTG();
        }
    })

    // Enter your own selection
    document.querySelectorAll('select').forEach(selected => {
        selected.addEventListener('change', function() {
            let value = selected.options[selected.selectedIndex].value;
            if(value === 'Enter your own') {
                let newElement = document.createElement('input');
                newElement.type = 'text';
                newElement.id = selected.id;
                newElement.className = selected.className;

                selected.replaceWith(newElement);
            }
        })
    })

    // Continue button clicked
    document.querySelector('#static-button').addEventListener('click', function() {
        StaticContinue();
    })
})

function MTG() {
    document.querySelector('#pokemon').style.display = 'none';
    document.querySelector('#MTG').style.display = 'block';

    // document.querySelector('#mtg-ct-label').style.display = 'block';
    // document.querySelector('#mtg-card-type').style.display = 'block';
}

function Pokemon() {
    document.querySelector('#MTG').style.display = 'none';
    document.querySelector('#pokemon').style.display = 'block';

    // document.querySelector('#pokemon-ct-label').style.display = 'block';
    // document.querySelector('#pokemon-card-type').style.display = 'block';
}

function StaticContinue() {
    document.querySelectorAll('.input-field').forEach(field => {
        fetch('/input', {
            method: 'POST',
            body: JSON.stringify({
                input: field.value,
            })
        })
        .then(response => response.json())
        .then(result => {
            if("error" in result) {
                // error
                alert(result['error'])
            }
        })
        .catch(error => {
            console.log(error);
        });
    })
}