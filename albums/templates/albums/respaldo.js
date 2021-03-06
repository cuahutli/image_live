const preview = document.getElementById('preview');
    const deleteLink = document.getElementById('delete');
    const downloadLink = document.getElementById('download');
    const checkAll = document.getElementById('check-all')

    
    $("#something").click( function(){
        if( $(this).is(':checked') ) alert("checked");
    });

    deleteLink.addEventListener("click", function(event){
        event.preventDefault()

        var ids = []
        var images = document.querySelectorAll('input[type="checkbox"]:checked')
        
        for (var i = 0; i < images.length; i+=1) {
            ids.push(images[i].getAttribute('image-id'))
        }

        fetch(this.href, {
            method: 'POST',
            body: JSON.stringify({
                'ids': ids
            })
        })
        .then(response => response.json())
        .then(function(data){
            
            for (var i = 0; i < data.images_deleted.length; i+=1) {
                var id = data.images_deleted[i]
                var image = document.getElementById(id).remove();
            } 
            
        });

    });

    downloadLink.addEventListener('click', function(event){
        event.preventDefault()
        
        var ids = []
        var images = document.querySelectorAll('input[type="checkbox"]:checked')
        
        for (var i = 0; i < images.length; i+=1) {
            ids.push(images[i].getAttribute('image-id'))
        }

        fetch(this.href, {
            method: 'POST',
            body: JSON.stringify({
                'ids': ids
            })
        })
        .then(response => response.blob())
        .then(blob => {
            
            console.log(blob)

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
    
            a.download =  blob.name;
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);

        });

    });
   
    $('#deleteModal').on('show.bs.modal', function (event) {
        
        var button = $(event.relatedTarget)
        var image = button[0];
        var modal = $(this)
        imageId = image.getAttribute('image-id');

        fetch(image.href)
        .then(response => response.json())
        .then(function(data){
            
            modal.find('#image-to-delete').text(data.name);
            modal.find('.delete-image-button')[0].href = data.delete_url

        });
    
    })

    $('.change-name').click(function(event) {
        imageId = this.getAttribute('image-Id');
        
        div = document.getElementById('image-name-' + imageId)
        div.style.display = "none";

        input = document.getElementById('input-name-' + imageId)
        input.setAttribute("type", "text");
        
    });

    $('.image-key').click(function(event) {
        
        imageId = this.getAttribute('image-Id');

        imagePreview = document.getElementById('preview-' + imageId);
        preview.src = imagePreview.value;
    });

    $('.selected').click(function(event){

        var count = document.querySelectorAll('input[type="checkbox"]:checked').length;
        if (count >= 1){
            
            downloadLink.classList.remove("disabled");
            deleteLink.classList.remove("disabled");

        } else {

            downloadLink.classList.add('disabled');
            deleteLink.classList.add('disabled');
        }

    });

    $('.download').click(function(event) {
        event.preventDefault();

        fetch(this.href, {
            method: 'GET',
        })
        .then(response => response.blob())
        .then(blob => {

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
    
            a.download = 'image'; // blob.type;
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);

        });
    });

    $('.image-form').submit(function(event){
        event.preventDefault()

        fetch(this.action, {
            body: new FormData(this),
            method: "POST"
        })
        .then(response => response.json())
        .then(data => {
            
            console.log(data)

            imageId = this.getAttribute('image-id');
            
            input = document.getElementById('input-name-' + imageId);
            div = document.getElementById('image-name-' + imageId)
            
            input.setAttribute('type', 'hidden')
            input.value = data.name;

            div.innerHTML = data.name;
            div.style.display = 'block';

            input = document.getElementById('preview-' + imageId)
            input.value = data.url
            
        });

    });