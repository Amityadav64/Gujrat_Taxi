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
  // 1. Fetching all values
  let name = document.getElementById("name").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let pickup = document.getElementById("pickupCity").value.trim();
  let drop = document.getElementById("dropCity").value.trim();
  let date = document.getElementById("bookingDate").value;
  let tripType = document.getElementById("tripType").value;
  let passengers = document.getElementById("passengers").value;
  let car = document.getElementById("car").value;

  // PREMIUM ADDITION: Get button reference for animation
  const btn = document.querySelector(".confirm-btn");
  const originalText = btn.innerHTML;

  // 2. Validation (Checking if all required fields are filled)
  if (!name || !phone || !pickup || !drop || !date) {
    alert("Please fill in all the details before booking.");
    return;
  }

  // 3. Phone number length check
  if (phone.length < 10) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  // PREMIUM ADDITION: Visual Feedback
  btn.innerHTML = "Processing...";
  btn.style.opacity = "0.7";
  btn.disabled = true;

  // 4. Formatting the WhatsApp Message (Premium Look with Emojis)
  let message = `🚖 *GUJARAT TAXI - NEW BOOKING*%0A` +
                `--------------------------%0A` +
                `👤 *Name:* ${name}%0A` +
                `📞 *Phone:* ${phone}%0A` +
                `📅 *Date:* ${date}%0A` +
                `--------------------------%0A` +
                `📍 *Pickup:* ${pickup}%0A` +
                `🏁 *Drop:* ${drop}%0A` +
                `🛣️ *Trip Type:* ${tripType}%0A` +
                `--------------------------%0A` +
                `👥 *Passengers:* ${passengers}%0A` +
                `🚗 *Vehicle:* ${car}%0A` +
                `--------------------------%0A` +
                `_Request sent from Website_`;

  // 5. Replace with your actual WhatsApp Number
  let number = "919000000000"; // Important: Include '91' but no '+' sign

  // 6. Open WhatsApp (Wrapped in timeout for "Premium" smoothness)
  setTimeout(() => {
    window.open(`https://wa.me{number}?text=${message}`, "_blank");

    // PREMIUM ADDITION: Show Success Popup
    const modal = document.getElementById("successModal");
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 10);

    // Reset Button state
    btn.innerHTML = originalText;
    btn.style.opacity = "1";
    btn.disabled = false;
  }, 800);
}

// Function to close the success popup
function closeModal() {
  const modal = document.getElementById("successModal");
  modal.classList.remove("active");
  
  // Wait for the popup animation to finish (300ms)
  setTimeout(() => {
    modal.style.display = "none";
    
    // --- FORM RESET LOGIC ---
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("pickupCity").value = "";
    document.getElementById("dropCity").value = "";
    
    // Reset dropdowns to first option
    document.getElementById("tripType").selectedIndex = 0;
    document.getElementById("passengers").selectedIndex = 0;
    document.getElementById("car").selectedIndex = 0;

    // Keep the date set to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById("bookingDate").value = today;
  }, 300);
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


/* for fade animation in about.html page */
document.addEventListener("DOMContentLoaded", function () {
  const stats = document.querySelectorAll(".stat-box");

  const observerOptions = {
    threshold: 0.2, // Triggers when 20% of the box is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Adds a small delay for each box to create the "one-by-one" effect
        setTimeout(() => {
          entry.target.classList.add("active");
        }, index * 200); // 200ms delay between each stat
        
        observer.unobserve(entry.target); // Stops watching once it has appeared
      }
    });
  }, observerOptions);

  stats.forEach((stat) => {
    observer.observe(stat);
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const stats = document.querySelectorAll(".stat-box");

// ---- for about.html ---- //
  // --- THE COUNTING LOGIC ---
  const startCounting = (el) => {
    const target = +el.getAttribute("data-target"); // Gets the number from data-target
    const speed = target / 100; // Adjusts speed based on the number size

    const updateCount = () => {
      const current = +el.innerText;
      if (current < target) {
        el.innerText = Math.ceil(current + speed);
        setTimeout(updateCount, 20); // Frequency of the update (in ms)
      } else {
        el.innerText = target; // Ensures it ends exactly on the target number
      }
    };
    updateCount();
  };

  // --- THE SCROLL OBSERVER ---
  const observerOptions = { threshold: 0.3 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 1. Trigger the Fade-In Animation
        entry.target.classList.add("active");

        // 2. Start the Counter for the number inside
        const counterElement = entry.target.querySelector(".counter");
        if (counterElement) {
          startCounting(counterElement);
        }

        // 3. Stop watching this box so it only animates once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  stats.forEach((stat) => observer.observe(stat));
});

// --- for index.html ---- //
/* =========================
   PREMIUM COUNTING EFFECT
========================= */

const counters = document.querySelectorAll('.counter');

const speed = 100;

const startCounting = () => {

  counters.forEach(counter => {

    const updateCount = () => {

      const target = +counter.getAttribute('data-target');

      const count = +counter.innerText;

      const increment = target / speed;

      if(count < target){

        counter.innerText = Math.ceil(count + increment);

        setTimeout(updateCount, 20);

      } else {

        // FORMAT 10000 -> 10K
        if(target >= 1000){

          counter.innerText = (target / 1000) + "K";

        } else {

          counter.innerText = target;

        }

      }

    };

    updateCount();

  });

};

/* START WHEN SECTION VISIBLE */

const infoStrip = document.querySelector('.info-strip');

const observerCounter = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      startCounting();

      observerCounter.disconnect();

    }

  });

}, { threshold: 0.5 });

observerCounter.observe(infoStrip);



