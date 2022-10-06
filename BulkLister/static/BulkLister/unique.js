document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#finish').onclick = function() {
        var array = []
        document.querySelectorAll('.input-field').forEach(field => {
            let index = field.dataset.id;
            let val = field.value;
            var item = [index, val]
            array.push(item)
            console.log(index)
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
            // document.querySelector('#session-id').value = result.id;
            let id = document.querySelector('#session-id').value;
            // location.href = `download/${id}`;
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
                session_id: document.querySelector('#session-id').value
            })
        })
        .then(response => response.json())
        .then(result => {
           console.log(result)
            let id = document.querySelector('#session-id').value;
            location.href = `/unique/${id}`;
        })
        .catch(error => {
            console.log(error);
        });
    }

    
})