document.addEventListener('DOMContentLoaded', function() {
    // game option selection
    document.querySelector('#game').addEventListener('change', function() {
        let select = document.querySelector('#game')
        let value = select.options[select.selectedIndex].value;
        if(value === 'Pokemon TCG') {
            document.querySelector('#MTG').style.display = 'none';
            document.querySelector('#pokemon').style.display = 'block';
        } else if(value === 'Magic: The Gathering') {
            document.querySelector('#pokemon').style.display = 'none';
            document.querySelector('#MTG').style.display = 'block';
        } else {
            document.querySelector('#pokemon').style.display = 'none';
            document.querySelector('#MTG').style.display = 'none';
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

    // Card is graded
    document.querySelector("#graded").addEventListener('change', function() {
        let select = document.querySelector('#graded')
        let value = select.options[select.selectedIndex].value;
        if(value === "Yes") {
            document.querySelector('#graded-yes').style.display = 'block';
        } else {
            document.querySelector('#graded-yes').style.display = 'none';
        }
    })

    // Card is autographed
    document.querySelector('#autographed').addEventListener('change', function() {
        let select = document.querySelector('#autographed')
        let value = select.options[select.selectedIndex].value;
        if(value === "Yes") {
            document.querySelector('#autographed-yes').style.display = 'block';
        } else {
            document.querySelector('#autographed-yes').style.display = 'none';
        }
    })
})

function StaticContinue() {
    document.querySelectorAll('.input-field').forEach(field => {
        fetch('/input', {
            method: 'POST',
            body: JSON.stringify({
                input: field.value,
                index: field.dataset.id
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