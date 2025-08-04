// Initialize Locomotive Scroll with full device support
const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'), // Your scroll container
  smooth: true,
  smartphone: {
    smooth: true
  },
  tablet: {
    smooth: true
  }
});

// Update scroll instance on resize
window.addEventListener('resize', () => {
  scroll.update();
});

// Video hover animation using GSAP
function videoconAnimation() {
  const videocon = document.querySelector("#video-container");
  const playbtn = document.querySelector("#play");

  videocon.addEventListener("mouseenter", function () {
    gsap.to(playbtn, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  videocon.addEventListener("mouseleave", function () {
    gsap.to(playbtn, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    });
  });

  videocon.addEventListener("mousemove", function (dets) {
    gsap.to(playbtn, {
      left: dets.clientX,
      top: dets.clientY,
      duration: 0.1
    });
  });
}
videoconAnimation();

// Loading animation for Page 1
function loadinganimation() {
  gsap.from("#page1 h1", {
    y: 180,
    opacity: 0,
    delay: 0.7,
    duration: 0.7,
    stagger: 0.4
  });

  gsap.from("#page1 #video-container", {
    scale: 0.9,
    opacity: 0,
    delay: 1.2,
    duration: 0.5,
    stagger: 0.5
  });
}
loadinganimation();

// Cursor tracking animation
document.addEventListener("mousemove", function (dets) {
  gsap.to("#cursor", {
    left: dets.x,
    top: dets.y
  });
});


// ====== Comment box functionality ====== //
(function() {
  const publishBtn = document.getElementById('publish');
  const userInput = document.querySelector('.user');
  const commentInput = document.querySelector('.usercomment');
  const commentsDiv = document.querySelector('.comments');
  const commentCountSpan = document.getElementById('comment');

  // Enable publish button only if comment input is not empty
  commentInput.addEventListener('input', () => {
    publishBtn.disabled = commentInput.value.trim() === '';
  });

  // Load stored comments from localStorage on page load
  window.addEventListener('load', () => {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    savedComments.forEach(c => addCommentToPage(c.user, c.text));
    updateCommentCount(savedComments.length);
  });

  // When publish is clicked
  publishBtn.addEventListener('click', () => {
    const user = userInput.value.trim() || 'Anonymous';
    const text = commentInput.value.trim();
    if (text === '') return; // extra safety

    const newComment = { user, text };

    // Save comment to localStorage
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    savedComments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(savedComments));

    // Add comment to page and update count
    addCommentToPage(user, text);
    updateCommentCount(savedComments.length);

    // Clear input and disable publish
    commentInput.value = '';
    publishBtn.disabled = true;
  });

  // Function to add comment HTML to comments div
  function addCommentToPage(user, text) {
    const commentEl = document.createElement('div');
    commentEl.classList.add('single-comment');
    commentEl.innerHTML = `<strong>${escapeHtml(user)}</strong>: ${escapeHtml(text)}`;
    commentsDiv.appendChild(commentEl);
  }

  // Update comment count number
  function updateCommentCount(count) {
    commentCountSpan.textContent = count;
  }

  // Simple function to escape HTML for safety
  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[m];
    });
  }
})();

