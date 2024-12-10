// var navbar = document.getElementsByClassName('center-nav-bar');
var griditem = document.getElementsByClassName('section-a-grid-child');

function expandSection(sectionId) {
    const sectionA = document.getElementById('section-a');
    const sectionB = document.getElementById('section-b');
    const centerNavBar = document.querySelector('.center-nav-bar');

    const isSectionA = sectionId === 'section-a';
    const expandedSection = isSectionA ? sectionA : sectionB;
    const collapsedSection = isSectionA ? sectionB : sectionA;

    // Toggle expanded state
    if (expandedSection.style.width === '90%') {
        // Reset both sections to 50%
        sectionA.style.width = '50%';
        sectionB.style.width = '50%';

        if (isSectionA) {
            resetGridBackgroundColors();
        }

    } else {
        // Expand the clicked section and shrink the other
        expandedSection.style.width = '90%';
        collapsedSection.style.width = '10%';

        if (isSectionA) {
            setGridBackgroundColorToBlack();
        }
    }

    // Update the position of the center nav bar
    updateCenterNavBarPosition();
}

function setGridBackgroundColorToBlack() {
    const gridChildren = document.querySelectorAll('#section-a .section-a-grid-child');
    const gridParent = document.querySelector('#section-a-grid');
    const gridBottomBar = document.querySelectorAll('.section-a-grid-child-textbox');
    const gridTextBox = document.querySelectorAll('.textbox-item-1 .textbox-item-2');
    
    gridChildren.forEach(child => {
        child.style.backgroundColor = 'black';
        child.style.height = '100vh';
        child.style.padding = '0';
        // child.style.color = '#F5F5F5';
    });
    gridBottomBar.forEach(bar => {
        bar.style.backgroundColor = 'gray';
        bar.style.height = '20vh';
        bar.style.padding = '10px';
    });
    gridTextBox.forEach(box => {
        box.style.fontSize = '16px';
    });
    gridParent.style.backgroundColor = 'black';
    // gridTextBox.style.fontSize = '16px';
}

// Helper function to reset the background color of section-a grid children
function resetGridBackgroundColors() {
    const gridChildren = document.querySelectorAll('#section-a .section-a-grid-child');
    const gridParent = document.querySelector('#section-a-grid');
    const gridBottomBar = document.querySelectorAll('.section-a-grid-child-textbox');
    const gridTextBox = document.querySelectorAll('.textbox-item-1 .textbox-item-2');

    gridChildren.forEach(child => {
        child.style.backgroundColor = '';
        child.style.height = ''; 
        child.style.padding = ''; // Resets to default
    });
    gridBottomBar.forEach(bar => {
        bar.style.backgroundColor='';
        bar.style.height = '';
        bar.style.padding = '';
    });
    gridTextBox.forEach(box => {
        box.style.fontSize = ''
    });
    gridParent.style.backgroundColor = '';
    // gridTextBox.style.fontSize = '';
}

function updateCenterNavBarPosition() {
    const sectionA = document.getElementById('section-a');
    const sectionB = document.getElementById('section-b');
    const centerNavBar = document.querySelector('.center-nav-bar');

    // Get the widths of section-a and section-b
    const sectionAWidth = sectionA.offsetWidth;
    const sectionBWidth = sectionB.offsetWidth;

    // Set the center-nav-bar position in the middle of the two sections
    const totalWidth = sectionAWidth + sectionBWidth;
    const leftOffset = (sectionAWidth / totalWidth) * 100;

    centerNavBar.style.left = `${leftOffset}%`;
    centerNavBar.style.transform = 'translate(-50%, -50%) rotateZ(90deg)'; 
    // Keep centered vertically and horizontally
}

  //embedding html into section b
  function loadHTML(sectionId, htmlFilePath) {
    const section = document.getElementById(sectionId);

    // Use the Fetch API to load the HTML file
    fetch(htmlFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${htmlFilePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            // Inject the HTML content into the section
            section.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading HTML:', error);
            section.innerHTML = `<p>Error loading content. Please try again later.</p>`;
        });
}

function toggleMenu() {
    const menu = document.getElementById('collapsible-menu');
    menu.classList.toggle('center-nav-bar-hidden');
}

function toggleMenu2() {
    const menu = document.getElementById('my-archive');
    menu.classList.toggle('my-archive-active');
}

function popupMessage() {
    alert('Archived!');
}

function playPreview(sectionId, previewFilePath) {
    const section = document.getElementById(sectionId);
    const sectionA = document.getElementById('section-a');

    // Ensure we're working with section-a and it's expanded
    const sectionWidth = window.getComputedStyle(sectionA).width;

    if (sectionId === 'section-a' && sectionWidth === '90%') {
        // Section-a is expanded
        const gridChildren = section.querySelectorAll('.section-a-grid-child');

        if (gridChildren.length > 0) {
            const firstGridChild = gridChildren[0]; // Get the first grid child
            const imageBox = firstGridChild.querySelector('.image-box');

            if (imageBox) {
                const image = imageBox.querySelector('img');
                if (image) {
                    // Create a video element
                    const video = document.createElement('video');
                    video.src = previewFilePath;
                    video.controls = true; // Enable video controls
                    video.autoplay = true; // Autoplay video
                    video.loop = true; // Loop video
                    video.style.width = '100%'; // Match image dimensions
                    video.style.height = '100%';

                    // Replace the image with the video
                    imageBox.innerHTML = ''; // Clear the image content
                    imageBox.appendChild(video);
                }
            }
        } else {
            console.warn("No grid children found in section-a.");
        }
    } else {
        // Section is not expanded; stop the video and restore the original image
        const gridChildren = section.querySelectorAll('.section-a-grid-child');
        if (gridChildren.length > 0) {
            const firstGridChild = gridChildren[0];
            const imageBox = firstGridChild.querySelector('.image-box');

            if (imageBox) {
                const video = imageBox.querySelector('video');
                if (video) {
                    // Stop the video and replace it with the original image
                    video.pause(); // Stop video playback
                    const image = document.createElement('img');
                    image.src = 'example.jpg'; // Replace with the original image source
                    image.alt = 'Music Video Thumbnail';
                    image.style.width = '100%';
                    image.style.height = '100%';

                    // Replace the video with the image
                    imageBox.innerHTML = '';
                    imageBox.appendChild(image);
                }
            }
        }
    }
}

//adding and removing class in the contents

document.querySelectorAll('.section-b-v2-container-textbox-menu button').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.target;

        // Remove active class from all buttons and content
        document.querySelectorAll('.section-b-v2-container-textbox-menu button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.section-b-v2-container-textbox-contents').forEach(content => content.classList.remove('active'));

        // Add active class to the selected button and content
        button.classList.add('active');
        document.getElementById(targetId).classList.add('active');
    });
});

//getting user cookie and archiving the music video list

let selectedVideoId = null; // Store the currently selected video ID

// Add event listeners to all music video sections
document.querySelectorAll('.section-a-grid-child-box').forEach(video => {
    video.addEventListener('click', () => {
        selectedVideoId = video.id; // Store the ID of the clicked section
        alert(`You have selected: ${selectedVideoId}`);
    });
});

// Function to get cookies as an object
function getCookies() {
    return document.cookie.split('; ').reduce((cookies, item) => {
        const [key, value] = item.split('=');
        cookies[key] = value ? decodeURIComponent(value) : '';
        return cookies;
    }, {});
}

// Function to set a cookie
function setCookie(name, value, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
}

// Function to save the selected video
function saveVideo() {
    if (!selectedVideoId) {
        alert('Please select a music video first.');
        return;
    }

    // Save the video ID to cookies
    const cookies = getCookies();
    const savedVideos = cookies.savedVideos ? JSON.parse(cookies.savedVideos) : [];
    if (!savedVideos.includes(selectedVideoId)) {
        savedVideos.push(selectedVideoId);
        setCookie('savedVideos', JSON.stringify(savedVideos));
    }

    // Update the My Archive list
    updateArchiveList(savedVideos);

    alert(`Saved: ${selectedVideoId}`);
}

// Function to update the My Archive list
function updateArchiveList(videos) {
    const archiveList = document.getElementById('archive-list');
    archiveList.innerHTML = ''; // Clear current list

    videos.forEach(videoId => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${videoId}`; // Create an anchor link to the video
        link.textContent = videoId; // Display the video ID
        listItem.appendChild(link);
        archiveList.appendChild(listItem);
    });
}

// Load saved videos on page load
window.onload = () => {
    const cookies = getCookies();
    const savedVideos = cookies.savedVideos ? JSON.parse(cookies.savedVideos) : [];
    updateArchiveList(savedVideos);
};

// Attach event listener to the Save button
document.getElementById('save-button').addEventListener('click', saveVideo);


// document.querySelector('.section-b-v2-container-textbox-menu').addEventListener('click', (event) => {
//     if (event.target.tagName === 'BUTTON') {
//       // Remove 'active' class from all buttons
//       document.querySelectorAll('.section-b-v2-container-textbox-menu button').forEach(button => {
//         button.classList.remove('active');
//       });
  
//       // Add 'active' class to the clicked button
//       event.target.classList.add('active');
  
//       // Remove 'active' class from all content items
//       document.querySelectorAll('.section-b-v2-container-textbox-contents').forEach(content => {
//         content.classList.remove('active');
//       });
  
//       // Add 'active' class to the targeted content
//       const targetId = event.target.getAttribute('data-target');
//       document.getElementById(targetId).classList.add('active');
//     }
//   });
  
  
  

// document.getElementById('section-a').onclick = function () {
//     playPreview('whiplash', 'assets/prev/whiplash-aespa-prev.mp4');
// };

  // Example interaction to toggle Section B versions
//   document.querySelectorAll('.section-a-grid-child').forEach(child => {
//     child.addEventListener('click', () => {
//       document.getElementById('section-b-v1').classList.toggle('hidden');
//       document.getElementById('section-b-v2').classList.toggle('hidden');
//     });
//   });
  