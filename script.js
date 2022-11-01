// Unsplash API
const randomPhotoCount = 10;
const apiKey = '';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${randomPhotoCount}`;

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		console.log(data);
	} catch (error){
		// Catch errors here
	}
}

// On Load
getPhotos();