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

    // Load button clicked
    document.querySelector('#load-button').onclick = function() {
        StaticContinue()
    }

    // Continue button clicked
    document.querySelector('#static-button').onclick = function() {
        let temp = document.querySelector('#session-id');
        console.log(temp.value)
        location.href = `unique/${temp.value}`;
    };

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

})

async function StaticContinue() {
    
    document.querySelectorAll('.input-field').forEach(async field => {
        // const sleep = (milliseconds) => {
        //     return new Promise(resolve => setTimeout(resolve, milliseconds))
        // }
        // fetch('/input', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         input: field.value,
        //         index: field.dataset.id,
        //         session_id: document.querySelector('#session-id').value
        //     })
        // })
        // await sleep(1000)
        // .then(response => response.json())
        // .then(result => {
        //     // console.log(result.id)
            // if("error" in result) {
            //     // error
            //     alert(result['error'])
            // } else {
            //     document.querySelector('#session-id').value = result.id;
            // }
        // })
        // .catch(error => {
        //     console.log(error);
        // });
        const response = await fetch('/input', {
            method: 'POST',
            body: JSON.stringify({
                input: field.value,
                index: field.dataset.id,
                session_id: document.querySelector('#session-id').value
            })
        })
        const json = await response.json();
        console.log(json);
        if("error" in json) {
            // error
            alert(json['error'])
        } else {
            document.querySelector('#session-id').value = json.id;
        }
    })
}