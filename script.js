document.getElementById('addMore').addEventListener('click', function() {
    const inputContainer = document.getElementById('inputContainer');
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group');
    inputGroup.innerHTML = `
        <div class="form-group">
            <label for="text">Enter Text:</label>
            <textarea name="text" rows="2" placeholder="Enter text here..."></textarea>
        </div>
        <div class="form-group">
            <label for="image">Upload Image:</label>
            <input type="file" name="image" accept="image/*">
        </div>
        <button type="button" class="remove">Remove</button>
    `;
    inputContainer.appendChild(inputGroup);

    inputGroup.querySelector('.remove').addEventListener('click', function() {
        inputContainer.removeChild(inputGroup);
    });
});

document.getElementById('videoForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData();
    const duration = document.getElementById('duration').value;
    formData.append('duration', duration);

    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach(group => {
        const text = group.querySelector('textarea').value;
        const image = group.querySelector('input[type="file"]').files[0];
        formData.append('texts[]', text);
        if (image) {
            formData.append('images[]', image);
        }
    });

    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    try {
        const response = await fetch('http://localhost:3008/generate-video', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (result.videoUrl) {
            document.getElementById('video').src = result.videoUrl;
        } else {
            alert('Failed to generate video.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to generate video.');
    }
});
