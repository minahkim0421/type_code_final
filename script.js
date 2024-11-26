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
    gridChildren.forEach(child => {
        child.style.backgroundColor = 'black';
        child.style.height = '100vh';
        child.style.color = '#F5F5F5';
    });
    gridParent.style.backgroundColor = 'black';
}

// Helper function to reset the background color of section-a grid children
function resetGridBackgroundColors() {
    const gridChildren = document.querySelectorAll('#section-a .section-a-grid-child');
    const gridParent = document.querySelector('#section-a-grid');
    gridChildren.forEach(child => {
        child.style.backgroundColor = '';
        child.style.height = ''; // Resets to default
    });
    gridParent.style.backgroundColor = '';
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
    menu.classList.toggle('expanded');
}


  // Example interaction to toggle Section B versions
//   document.querySelectorAll('.section-a-grid-child').forEach(child => {
//     child.addEventListener('click', () => {
//       document.getElementById('section-b-v1').classList.toggle('hidden');
//       document.getElementById('section-b-v2').classList.toggle('hidden');
//     });
//   });
  