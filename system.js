const form = document.getElementById("commentForm");
const commentList = document.getElementById("commentList");

// LOAD COMMENTS
window.addEventListener("load", () => {
  loadComments();
  createParticles();
});

/* =====================================
   PARTICLE EFFECT
===================================== */

function createParticles() {

  for (let i = 0; i < 25; i++) {

    const particle =
      document.createElement("div");

    particle.classList.add("particle");

    particle.style.left =
      Math.random() * window.innerWidth + "px";

    particle.style.top =
      Math.random() * window.innerHeight + "px";

    particle.style.animationDuration =
      Math.random() * 5 + 3 + "s";

    document.body.appendChild(particle);
  }
}

/* =====================================
   COMMENT SUBMIT
===================================== */

form.addEventListener("submit", function (e) {

  e.preventDefault();

  const name =
    form.querySelector("input[type='text']").value;

  const message =
    form.querySelector("textarea").value;

  // Comment object
  const commentData = {
    name: name,
    message: message,
    date: new Date().toLocaleString(),
  };

  // Save in localStorage
  let comments =
    JSON.parse(localStorage.getItem("comments")) || [];

  comments.unshift(commentData);

  localStorage.setItem(
    "comments",
    JSON.stringify(comments)
  );

  // Display comment
  displayComment(commentData);

  // Success popup
  showPopup("✅ Comment Saved!");

  // Reset form
  form.reset();
});

/* =====================================
   DISPLAY COMMENT
===================================== */

function displayComment(comment) {

  const commentBox =
    document.createElement("div");

  commentBox.classList.add(
    "comment-box",
    "show-comment"
  );

  // Random emoji
  const emojis =
    ["🌟", "🔥", "💚", "📚", "🧪", "✨"];

  const emoji =
    emojis[Math.floor(Math.random() * emojis.length)];

  commentBox.innerHTML = `
  
    <div class="comment-header">

      <h3>${emoji} ${comment.name}</h3>

      <span>${comment.date}</span>

    </div>

    <p class="typing-text"></p>
  `;

  commentList.prepend(commentBox);

  // Typing effect
  const typingText =
    commentBox.querySelector(".typing-text");

  let i = 0;

  function typeEffect() {

    if (i < comment.message.length) {

      typingText.innerHTML +=
        comment.message.charAt(i);

      i++;

      setTimeout(typeEffect, 30);
    }
  }

  typeEffect();
}

/* =====================================
   LOAD COMMENTS
===================================== */

function loadComments() {

  let comments =
    JSON.parse(localStorage.getItem("comments")) || [];

  comments.forEach((comment) => {
    displayComment(comment);
  });
}

/* =====================================
   POPUP MESSAGE
===================================== */

function showPopup(text) {

  const popup =
    document.createElement("div");

  popup.classList.add("popup");

  popup.innerText = text;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("show-popup");
  }, 100);

  setTimeout(() => {

    popup.classList.remove("show-popup");

    setTimeout(() => {
      popup.remove();
    }, 500);

  }, 2500);
}

/* =====================================
   MOUSE GLOW EFFECT
===================================== */

document.addEventListener("mousemove", (e) => {

  const glow =
    document.createElement("div");

  glow.classList.add("glow");

  glow.style.left = e.pageX + "px";

  glow.style.top = e.pageY + "px";

  document.body.appendChild(glow);

  setTimeout(() => {
    glow.remove();
  }, 500);
});

/* =====================================
   IMAGE POPUP
===================================== */

const galleryImages =
  document.querySelectorAll(".gallery-img");

const imagePopup =
  document.getElementById("imagePopup");

const popupImage =
  document.getElementById("popupImage");

const closeImage =
  document.querySelector(".close-image");

// Open popup
galleryImages.forEach((img) => {

  img.addEventListener("click", () => {

    imagePopup.classList.add("show-image");

    popupImage.src = img.src;
  });
});

// Close popup
closeImage.addEventListener("click", () => {

  imagePopup.classList.remove("show-image");
});

// Close when clicking outside
imagePopup.addEventListener("click", (e) => {

  if (e.target === imagePopup) {

    imagePopup.classList.remove("show-image");
  }
});
// VIDEO HOVER SOUND EFFECT

const videoCards =
  document.querySelectorAll(".video-card");

videoCards.forEach((card) => {

  card.addEventListener("mouseenter", () => {

    card.style.transform =
      "scale(1.03)";

  });

  card.addEventListener("mouseleave", () => {

    card.style.transform =
      "scale(1)";

  });

});