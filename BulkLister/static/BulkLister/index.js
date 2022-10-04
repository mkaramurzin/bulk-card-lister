document.addEventListener('DOMContentLoaded', function() {
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
                newElement.className = selected.className;

                selected.replaceWith(newElement);
            }
        })
    })

    // Continue button clicked
    document.querySelector('#static-button').onclick = function() {
        StaticContinue();
        // let id = document.querySelector('#session-id').value;
        // location.href = `unique/${id}`;
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


    // info icons
    $(document).ready(function() {
        $('#txtName').tooltip();
    });

})

// async function StaticContinue() {
    
//     document.querySelectorAll('.input-field').forEach(async field => {
//         // const sleep = (milliseconds) => {
//         //     return new Promise(resolve => setTimeout(resolve, milliseconds))
//         // }
//         // fetch('/input', {
//         //     method: 'POST',
//         //     body: JSON.stringify({
//         //         input: field.value,
//         //         index: field.dataset.id,
//         //         session_id: document.querySelector('#session-id').value
//         //     })
//         // })
//         // await sleep(1000)
//         // .then(response => response.json())
//         // .then(result => {
//         //     // console.log(result.id)
//             // if("error" in result) {
//             //     // error
//             //     alert(result['error'])
//             // } else {
//             //     document.querySelector('#session-id').value = result.id;
//             // }
//         // })
//         // .catch(error => {
//         //     console.log(error);
//         // });
//         const response = await fetch('/input', {
//             method: 'POST',
//             body: JSON.stringify({
//                 input: field.value,
//                 index: field.dataset.id,
//                 session_id: document.querySelector('#session-id').value
//             })
//         })
//         const json = await response.json();
//         console.log(json);
//         if("error" in json) {
//             // error
//             alert(json['error'])
//         } else {
//             document.querySelector('#session-id').value = json.id;
//         }
//     })
// }

function StaticContinue() {
    var array = []
    document.querySelectorAll('.input-field').forEach(field => {
        let index = field.dataset.id;
        let val = field.value;
        var item = [index, val]
        array.push(item)
    })
    console.log(array)
    fetch('input', {
        method: 'POST',
        body: JSON.stringify({
            array: array
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result) 
        document.querySelector('#session-id').value = result.id;
        let id = document.querySelector('#session-id').value;
        console.log(id)
        location.href = `unique/${id}`;
    })
    .catch(error => {
        console.log(error);
    });
}
