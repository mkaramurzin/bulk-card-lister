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

    document.querySelector('#finish').onclick = function() {
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
                session_id: document.querySelector('#session-id').value
            })
        })
        .then(response => response.json())
        .then(result => {
           console.log(result)
           let id = document.querySelector('#session-id').value; 
           location.href = `/download/${id}`;
        })
        .catch(error => {
            console.log(error);
        });
    }

    // next listing
    document.querySelector('#next').onclick = function() {
        let listing = document.querySelector('#listing-id');
        alert(listing.value)
    }
})