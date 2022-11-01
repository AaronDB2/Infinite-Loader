const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imageLoaded = 0;
let totalImages = 0;

// Unsplash API
const randomPhotoCount = 30;
const apiKey = 'INSERT API KEY HERE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${randomPhotoCount}`;

// Checks if all images where loaded
function imagesLoaded() {
	imageLoaded++;
	if (imageLoaded === totalImages){
		ready = true;
		loader.hidden = true;
	}
}

// Helper function for setting attributes on DOM elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create elements for photos and links and add these to the DOM
function displayPhotos() {
	imageLoaded = 0;
	totalImages = photosArray.length;

	// Run function for each object in photosArray
	photosArray.forEach((photo) => {
		// Creating anchor element to link to Unsplash
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});

		// Create image for photo
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_desciption,
			title: photo.alt_desciption,
		});

		// Event listener. Checks if the image is loaded
		img.addEventListener('load', imagesLoaded);

		// Put image inside the anchor element. Then put both inside the image container
		item.appendChild(img);
		imageContainer.appendChild(item);
	}); 
}

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error){
		// Catch errors here
	}
}

// Check to see if scrolling near bottom of page. Load more photos at the end
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
		ready = false;
		getPhotos();
	}
});

// On Load
getPhotos();