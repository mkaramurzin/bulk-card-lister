document.addEventListener('DOMContentLoaded', function() {

    // graded
    document.querySelector("#graded").addEventListener('change', function() {
        let select = document.querySelector('#graded')
        let value = select.options[select.selectedIndex].value;
        if(value === "Yes") {
            document.querySelector('#graded-yes').style.display = 'block';
        } else {
            document.querySelector('#graded-yes').style.display = 'none';
        }
    })
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
                newElement.dataset.id = selected.dataset.id;
                newElement.className = selected.className;

                selected.replaceWith(newElement);
            }
        })
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

    // additional selling details
    document.querySelector('#additional-selling').addEventListener('change', function() {
        let box = document.querySelector('#additional-selling');
        if(box.checked) {
            document.querySelector('#additional-selling-details').style.display = 'block';
        } else {
            document.querySelector('#additional-selling-details').style.display = 'none';
        }
    })

    // additional options
    document.querySelector('#additional-options-checkbox').addEventListener('change', function() {
        let box = document.querySelector('#additional-options-checkbox');
        if(box.checked) {
            document.querySelector('#additional-options').style.display = 'block';
        } else {
            document.querySelector('#additional-options').style.display = 'none';
        }
    })

    // additional shipping details
    document.querySelector('#additional-shipping-checkbox').addEventListener('change', function() {
        let box = document.querySelector('#additional-shipping-checkbox');
        if(box.checked) {
            document.querySelector('#additional-shipping').style.display = 'block';
        } else {
            document.querySelector('#additional-shipping').style.display = 'none';
        }
    })

    // paypal accepted
    document.querySelector('#paypal-accepted').addEventListener('change', function() {
        let select = document.querySelector('#paypal-accepted')
        let value = select.options[select.selectedIndex].value;
        if(value === "Yes") {
            document.querySelector('#paypal-accepted-yes').style.display = 'block';
        } else {
            document.querySelector('#paypal-accepted-yes').style.display = 'none';
        }
    })

    // returns accepted
    document.querySelector('#returns-accepted').addEventListener('change', function() {
        let select = document.querySelector('#returns-accepted')
        let value = select.options[select.selectedIndex].value;
        if(value === "ReturnsAccepted") {
            document.querySelector('#returns').style.display = 'block';
        } else {
            document.querySelector('#returns').style.display = 'none';
        }
    })

    // eBay business policy
    document.querySelector('#policy').addEventListener('change', function() {
        let select = document.querySelector('#policy')
        let value = select.options[select.selectedIndex].value;
        if(value === "Yes") {
            document.querySelector('#policy-yes').style.display = 'block';
            document.querySelector('#policy-no').style.display = 'none';
        } else if(value == "No") {
            document.querySelector('#policy-yes').style.display = 'none';
            document.querySelector('#policy-no').style.display = 'block';
        } else {
            document.querySelector('#policy-yes').style.display = 'none';
            document.querySelector('#policy-no').style.display = 'none';
        }
    })

    // name tamplate
    document.querySelector('#save-btn').addEventListener('click', function() {
        let name = prompt("Name your template:", "");
        if(name === "") {
            alert("You must name your template to save it")
        } else {
            document.querySelector('#save').value = name;
            document.getElementById('save-btn').className = 'btn btn-success';
            document.getElementById('save-btn').innerHTML = "Continue to save";
        }
    })

    // if fields are filled out on unique page
    let gameVal = document.querySelector('#game').value;
    if(gameVal === "Pokemon TCG") {
        document.querySelector('#pokemon').style.display = 'block';
    } else if(gameVal === "MTG") {
        document.querySelector('#MTG').style.display = 'block';
    }

    if(document.querySelector('#graded').value === "Yes") {
        document.querySelector('#graded-yes').style.display = 'block';
    }

    // Continue button clicked
    document.querySelector('#static-button').onclick = function() {
        StaticContinue();
    };

    // finish
    document.querySelector('#finish-button').onclick = function() {
        var array = []
        document.querySelectorAll('.input-field').forEach(field => {
            let index = field.dataset.id;
            let val = field.value;
            var item = [index, val]
            array.push(item)
        })

        fetch('finish', {
            method: 'POST',
            body: JSON.stringify({
                array: array,
                session_id: document.querySelector('#session-id').value,
            })
        })
        .then(response => response.json())
        .then(result => {
            let id = document.querySelector('#session-id').value;
            location.href = `download/${id}`;
        })
        .catch(error => {
            console.log(error);
        });
    }

    // next listing
    document.querySelector('#next').onclick = function() {
        var array = []
        document.querySelectorAll('.input-field').forEach(field => {
            let index = field.dataset.id;
            let val = field.value;
            var item = [index, val]
            array.push(item)
        })

        fetch('finish', {
            method: 'POST',
            body: JSON.stringify({
                array: array,
                session_id: document.querySelector('#session-id').value,
            })
        })
        .then(response => response.json())
        .then(result => {
            let id = document.querySelector('#session-id').value;
            location.href = `/unique/${id}`;
        })
        .catch(error => {
            console.log(error);
        });
    }
})

function StaticContinue() {
    var array = []
    document.querySelectorAll('.input-field').forEach(field => {
        let index = field.dataset.id;
        let val = field.value;
        var item = [index, val]
        array.push(item)
    })
    fetch('/input', {
        method: 'POST',
        body: JSON.stringify({
            array: array,
            template: document.querySelector('#save').value,
            id: document.querySelector('#session-id').value
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        let id = document.querySelector('#session-id').value;
        location.href = `/unique/${id}`;
    })
    .catch(error => {
        console.log(error);
    });
}
