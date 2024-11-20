document.addEventListener('DOMContentLoaded', function () {
  // Add drag functionality for each draggable element
  for (let i = 1; i <= 5; i++) {
      addDraggableFunctionality(`draggable-element-${i}`);
  }
});

function addDraggableFunctionality(elementId) {
  var draggableElement = document.getElementById(elementId);

  var offsetX, offsetY;
  var isDragging = false;

  // Add mouse down event listener
  draggableElement.addEventListener('mousedown', function (e) {
      isDragging = true;

      // Calculate the offset
      offsetX = e.clientX - draggableElement.getBoundingClientRect().left;
      offsetY = e.clientY - draggableElement.getBoundingClientRect().top;
  });

  // Add mouse move event listener
  document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;

      // Calculate the new position
      var newX = e.clientX - offsetX;
      var newY = e.clientY - offsetY;

      // Set the new position
      draggableElement.style.left = newX + 'px';
      draggableElement.style.top = newY + 'px';
  });

  // Add mouse up event listener
  document.addEventListener('mouseup', function () {
      isDragging = false;
  });

  // Optional: Add touch events for mobile devices
  draggableElement.addEventListener('touchstart', function (e) {
      isDragging = true;

      var touch = e.touches[0];

      // Calculate the offset
      offsetX = touch.clientX - draggableElement.getBoundingClientRect().left;
      offsetY = touch.clientY - draggableElement.getBoundingClientRect().top;
  });

  document.addEventListener('touchmove', function (e) {
      if (!isDragging) return;

      var touch = e.touches[0];

      // Calculate the new position
      var newX = touch.clientX - offsetX;
      var newY = touch.clientY - offsetY;

      // Set the new position
      draggableElement.style.left = newX + 'px';
      draggableElement.style.top = newY + 'px';

      // Prevent default touchmove behavior
      e.preventDefault();
  });

  document.addEventListener('touchend', function () {
      isDragging = false;
  });
}

document.addEventListener('DOMContentLoaded', function () {
    // Get the navigation links
    var navLinks = document.querySelectorAll('nav a');

    // Add click event listeners to navigation links
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the target section id from the href attribute
            var targetId = link.getAttribute('href').substring(1);

            // Scroll to the target section smoothly
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add intersection observer to handle section visibility
    var sections = document.querySelectorAll('section');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            var sectionId = entry.target.id;

            // Update navigation links based on section visibility
            if (entry.isIntersecting) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(function (section) {
        observer.observe(section);
    });    
});

document.addEventListener('DOMContentLoaded', function () {
    var contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form input values
        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var subject = document.getElementById('subject').value.trim();
        var message = document.getElementById('message').value.trim();

        // Validate input fields
        if (!name || !email || !subject || !message) {
            alert('Please fill out all fields.');
            return;
        }

        // Validate email format
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // If all validation passes, you can submit the form or perform further actions
        alert('Form submitted successfully!');
        // You may want to submit the form to a server using AJAX or perform other actions here
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var galleryThumbnails = document.querySelectorAll('.gallery-thumbnail');
    var modal = document.createElement('div');
    modal.className = 'modal';
    var modalImage = document.createElement('img');
    modalImage.className = 'modal-image';

    document.body.appendChild(modal);
    modal.appendChild(modalImage);

    var currentIndex = 0;

    function showImage(index) {
        var largeImagePath = galleryThumbnails[index].getAttribute('data-src');
        modalImage.setAttribute('src', largeImagePath);
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryThumbnails.length;
        showImage(currentIndex);
    }

    // Set initial image
    showImage(currentIndex);

    // Add click event listeners to each thumbnail
    galleryThumbnails.forEach(function (thumbnail, index) {
        thumbnail.addEventListener('click', function () {
            currentIndex = index;
            showImage(currentIndex);
            modal.style.display = 'flex';
        });
    });

    // Set interval for automatic image transition every 3 seconds
    setInterval(nextImage, 3000);

    modal.addEventListener('click', function () {
        modal.style.display = 'none';
    });
});

