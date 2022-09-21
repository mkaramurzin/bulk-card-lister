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

    // MTG card type selection
    document.querySelector('#mtg-card-type').addEventListener('change', function() {
        let select = document.querySelector('#mtg-card-type')
        let value = select.options[select.selectedIndex].value
        if(value === 'Enter your own') {

        }
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