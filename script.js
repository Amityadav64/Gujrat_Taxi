// =========================
// NEW: ROUTE SELECTION LOGIC
// =========================
// This captures which route the user wants before they go to book.html
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("book-now-btn")) {
    const card = e.target.closest(".route-card");
    const routeTitle = card.querySelector("h3").innerText; // e.g., "Ahmedabad → Surat"
    
    // Split the text to get Pickup and Drop separately
    const cities = routeTitle.split("→");
    if (cities.length === 2) {
      localStorage.setItem("selectedPickup", cities[0].trim());
      localStorage.setItem("selectedDrop", cities[1].trim());
    }
  }
});

// =========================
// BOOK TAXI FUNCTION (Updated)
// =========================
function bookTaxi() {
  let name = document.getElementById("name").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let pickup = document.getElementById("pickupCity").value.trim();
  let drop = document.getElementById("dropCity").value.trim();
  let car = document.getElementById("car").value;

  if (name === "" || phone === "" || pickup === "" || drop === "") {
    alert("Please fill all details");
    return;
  }

  if (phone.length < 10) {
    alert("Enter a valid 10-digit phone number");
    return;
  }

  let message = `🚖 *New Taxi Booking* %0A` +
                `*Name:* ${name}%0A` +
                `*Phone:* ${phone}%0A` +
                `*Pickup:* ${pickup}%0A` +
                `*Drop:* ${drop}%0A` +
                `*Car:* ${car}`;

  let number = "91XXXXXXXXXX"; // REPLACE WITH YOUR REAL NUMBER
  window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  alert("Booking request sent to WhatsApp!");
}

// =========================
// AUTO-FILL ON BOOK.HTML LOAD
// =========================
window.addEventListener("load", () => {
  // If we are on the booking page, fill the saved route
  const pickupInput = document.getElementById("pickupCity");
  const dropInput = document.getElementById("dropCity");

  if (pickupInput && dropInput) {
    const savedPickup = localStorage.getItem("selectedPickup");
    const savedDrop = localStorage.getItem("selectedDrop");

    if (savedPickup) pickupInput.value = savedPickup;
    if (savedDrop) dropInput.value = savedDrop;

    // Clear storage after filling so it doesn't stay there forever
    localStorage.removeItem("selectedPickup");
    localStorage.removeItem("selectedDrop");
  }

  // --- LOADER LOGIC ---
  let loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.display = "none";
    }, 1200);
  }
});

// =========================
// HERO SLIDER AUTO CHANGE (Safety Fix)
// =========================
let slides = document.querySelectorAll(".slide");
if (slides.length > 0) {
  let index = 0;
  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 5000); // slower (5 sec)
}

// =========================
// SMOOTH SCROLL & SCROLL ANIMATION (Unchanged)
// =========================
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    let target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const elements = document.querySelectorAll(".fade-in");
window.addEventListener("scroll", () => {
  elements.forEach(el => {
    let position = el.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});


function sendWhatsApp() {
  // 1. Get elements and values
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const messageField = document.getElementById("message");
  const formBox = document.querySelector(".contact-form");

  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const message = messageField.value.trim();

  // 2. The "Gatekeeper" Validation
  if (name === "" || email === "" || message === "") {
    // Advanced: Add a shake effect to the form box
    formBox.classList.add("shake-error");
    
    // Remove the shake class after animation finishes (500ms)
    setTimeout(() => {
      formBox.classList.remove("shake-error");
    }, 500);

    // Modern Alert (You can later replace this with a SweetAlert2 popup)
    alert("⚠️ Please fill in all fields before sending!");
    return; // This is the most important line - it stops the code here!
  }

  // 3. Email Format Validation (Optional but pro)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("📧 Please enter a valid email address.");
    emailField.focus();
    return;
  }

  // 4. Success - Prepare and Send
  const phone = "919876543210"; 
  
  // Professional WhatsApp formatting using bold tags (*)
  let text = `*New Contact Message*%0A` +
             `----------------------------%0A` +
             `*Name:* ${name}%0A` +
             `*Email:* ${email}%0A` +
             `*Message:* ${message}`;

  let url = `https://wa.me/${phone}?text=${text}`;

  window.open(url, "_blank");
}

function quickWhatsApp() {
  const phone = "919876543210"; 
  
  // Get current hour to decide greeting
  const hour = new Date().getHours();
  let greeting = "Hello";
  
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  // Advanced: Detect which page the user is on
  const currentPage = window.location.pathname.split("/").pop() || "Home";
  const pageName = currentPage.replace(".html", "");

  const text = `${greeting} Gujarat Taxi! 🚕%0AI am reaching out from your *${pageName}* page and would like to book a ride.`;

  const url = `https://wa.me/${phone}?text=${text}`;

  window.open(url, "_blank");
}

// ACTIVE NAV LINK AUTO DETECT
document.addEventListener("DOMContentLoaded", function () {

  // ACTIVE NAV LINK
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  // HAMBURGER MENU
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

});




// Intersection Observer for scroll animations , and its for service.html
const observerOptions = {
  threshold: 0.3 // Starts when 30% of the block is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

document.querySelectorAll('.service-block').forEach(block => {
  observer.observe(block);
});


/* =========================
   HOME SEARCH FUNCTION
========================= */

function searchRoute() {

  const pickup = document.getElementById("pickup").value
    .trim()
    .toLowerCase();

  const drop = document.getElementById("drop").value
    .trim()
    .toLowerCase();

  if (pickup === "" || drop === "") {
    alert("Please enter pickup and drop location");
    return;
  }

  const routeId = pickup + "-" + drop;

  localStorage.setItem("searchedRoute", routeId);

  window.location.href = "routes.html";
}


/* =========================
   ENTER KEY SEARCH
========================= */

document.addEventListener("keypress", function(e) {

  if (e.key === "Enter") {
    searchRoute();
  }

});


/* =========================
   ROUTE AUTO SCROLL
========================= */

window.addEventListener("DOMContentLoaded", () => {

  const searchedRoute = localStorage.getItem("searchedRoute");

  if (searchedRoute) {

    setTimeout(() => {

      const targetCard = document.getElementById(searchedRoute);

      if (targetCard) {

        targetCard.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

        targetCard.style.boxShadow = "0 0 35px #fcd535";
        targetCard.style.transform = "scale(1.02)";
        targetCard.style.transition = "0.4s";

        setTimeout(() => {
          targetCard.style.boxShadow = "";
          targetCard.style.transform = "";
        }, 3000);

      } else {

        alert("No route available for this location.");

      }

      localStorage.removeItem("searchedRoute");

    }, 500);

  }

});


/* PREMIUM PAGE LOADER */

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  setTimeout(() => {

    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    loader.style.transition = "0.8s ease";

  }, 3000);

});