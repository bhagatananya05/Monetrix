// Trigger file input click when the "Upload" button is clicked
document.getElementById('uploadButton').addEventListener('click', function () {
    document.getElementById('fileInput').click();
  });
  
  // Event listener for file input change
  document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function () {
      const imageUrl = reader.result;
      const fileName = file.name;
  
      // Display the uploaded image and image name
      displayUploadedFile(imageUrl, fileName);
    };
  
    reader.readAsDataURL(file);
  });
  
  // Function to display the uploaded image and image name
  function displayUploadedFile(imageUrl, fileName) {
    const imageContainer = document.getElementById('imageContainer');
    const uploadedImage = document.createElement('img');
    uploadedImage.id = 'uploadedImage';
    uploadedImage.src = imageUrl;
    uploadedImage.alt = 'Uploaded Receipt';
  
    const imageName = document.createElement('p');
    imageName.id = 'fileNameLabel';
    const imageNameText = document.createElement('span');
    imageNameText.id = 'imageName';
    imageNameText.textContent = `${fileName}`;
    imageName.appendChild(imageNameText);
  
    // Clear previous elements inside imageContainer
    while (imageContainer.firstChild) {
      imageContainer.removeChild(imageContainer.firstChild);
    }
  
    // Append new elements
    imageContainer.appendChild(uploadedImage);
    imageContainer.appendChild(imageName);
  }
  
  