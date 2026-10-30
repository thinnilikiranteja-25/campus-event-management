
// CampusEvents - JavaScript Functionality

// 1. Sample College Events
const events = [
    {
        id: 1,
        title: "CodeFest 2026",
        category: "Technical",
        icon: "💻",
        date: "2026-11-05",
        time: "10:00 AM",
        venue: "Computer Science Block",
        organizer: "Coding Club",
        description: "Participate in coding competitions, solve programming challenges and showcase your technical skills."
    },
    {
        id: 2,
        title: "Annual Cultural Fest",
        category: "Cultural",
        icon: "🎭",
        date: "2026-11-10",
        time: "09:30 AM",
        venue: "College Auditorium",
        organizer: "Cultural Committee",
        description: "Enjoy music, dance, drama and exciting cultural performances by talented students."
    },
    {
        id: 3,
        title: "Inter-College Cricket",
        category: "Sports",
        icon: "🏏",
        date: "2026-11-15",
        time: "08:00 AM",
        venue: "College Sports Ground",
        organizer: "Sports Club",
        description: "Show your sportsmanship and participate in the exciting inter-college cricket tournament."
    },
    {
        id: 4,
        title: "Web Development Workshop",
        category: "Workshop",
        icon: "🛠️",
        date: "2026-11-20",
        time: "11:00 AM",
        venue: "IT Laboratory",
        organizer: "Web Development Club",
        description: "Learn the fundamentals of HTML, CSS and JavaScript through practical activities."
    },
    {
        id: 5,
        title: "AI and Future Technology",
        category: "Seminar",
        icon: "🤖",
        date: "2026-11-25",
        time: "10:30 AM",
        venue: "Seminar Hall",
        organizer: "Department of CSE",
        description: "Explore artificial intelligence, machine learning and the future of emerging technologies."
    },
    {
        id: 6,
        title: "Hackathon 2026",
        category: "Technical",
        icon: "🚀",
        date: "2026-12-02",
        time: "09:00 AM",
        venue: "Innovation Centre",
        organizer: "Innovation Club",
        description: "Build creative solutions to real-world problems and demonstrate your innovation skills."
    },
    {
        id: 7,
        title: "Photography Competition",
        category: "Cultural",
        icon: "📸",
        date: "2026-12-08",
        time: "10:00 AM",
        venue: "Main Campus",
        organizer: "Creative Arts Club",
        description: "Capture memorable moments and present your creativity through photography."
    },
    {
        id: 8,
        title: "Football Championship",
        category: "Sports",
        icon: "⚽",
        date: "2026-12-12",
        time: "08:30 AM",
        venue: "College Football Ground",
        organizer: "Sports Committee",
        description: "Participate in an exciting football championship and represent your department."
    },
    {
        id: 9,
        title: "Personality Development",
        category: "Workshop",
        icon: "🎯",
        date: "2026-12-18",
        time: "11:00 AM",
        venue: "Lecture Hall 2",
        organizer: "Training and Placement Cell",
        description: "Improve communication, leadership, confidence and interview preparation skills."
    }
];

// 2. DOM Elements
const eventGrid = document.getElementById("eventGrid");
const searchInput = document.getElementById("searchInput");
const eventCount = document.getElementById("eventCount");
const registrationList = document.getElementById("registrationList");
const registrationCount = document.getElementById("registrationCount");

const detailsModal = document.getElementById("detailsModal");
const registerModal = document.getElementById("registerModal");
const detailsContent = document.getElementById("detailsContent");
const registrationForm = document.getElementById("registrationForm");

// 3. LocalStorage
// Save and retrieve student registrations.

function getRegistrations() {
    try {
        return JSON.parse(localStorage.getItem("campusRegistrations")) || [];
    } catch (error) {
        return [];
    }
}

let registrations = getRegistrations();

function saveRegistrations() {
    localStorage.setItem(
        "campusRegistrations",
        JSON.stringify(registrations)
    );
}

// 4. Format Date
function formatDate(date) {
    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

// 5. Display Event Cards
function displayEvents(eventArray) {
    eventGrid.innerHTML = "";

    eventCount.textContent =
        `${eventArray.length} ${eventArray.length === 1 ? "Event" : "Events"}`;

    if (eventArray.length === 0) {
        eventGrid.innerHTML = `
            <div class="empty-state">
                <h3>🔍 No Events Found</h3>
                <p>Try another keyword or select a different category.</p>
            </div>
        `;
        return;
    }

    eventArray.forEach(event => {
        const isRegistered = registrations.some(
            item => item.eventId === event.id
        );

        const card = document.createElement("article");
        card.className = "event-card";

        card.innerHTML = `
            <div class="event-banner ${event.category.toLowerCase()}">
                <span class="category-label">${event.category}</span>
                <span>${event.icon}</span>
            </div>

            <div class="event-body">
                <h3>${event.title}</h3>

                <p class="event-description">${event.description}</p>

                <div class="event-meta">
                    <span>📅 ${formatDate(event.date)}</span>
                    <span>⏰ ${event.time}</span>
                    <span>📍 ${event.venue}</span>
                </div>

                <div class="event-actions">
                    <button class="details-btn"
                        data-action="details" data-id="${event.id}">
                        View Details
                    </button>

                    <button class="register-btn"
                        data-action="register" data-id="${event.id}"
                        ${isRegistered ? "disabled" : ""}>
                        ${isRegistered ? "✓ Registered" : "Register"}
                    </button>
                </div>
            </div>
        `;

        eventGrid.appendChild(card);
    });
}

// 6. Search and Category Filtering
let selectedCategory = "All";

function filterEvents() {
    const keyword = searchInput.value.trim().toLowerCase();

    const filteredEvents = events.filter(event => {
        const matchesCategory =
            selectedCategory === "All" ||
            event.category === selectedCategory;

        const matchesSearch = [
            event.title,
            event.category,
            event.venue,
            event.organizer,
            event.description
        ].some(value => value.toLowerCase().includes(keyword));

        return matchesCategory && matchesSearch;
    });

    displayEvents(filteredEvents);
}

searchInput.addEventListener("input", filterEvents);

document.getElementById("searchBtn").addEventListener("click", filterEvents);

document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".category-btn.active")
            ?.classList.remove("active");

        button.classList.add("active");
        selectedCategory = button.dataset.category;

        filterEvents();
    });
});

// 7. View Event Details
function showEventDetails(id) {
    const event = events.find(item => item.id === Number(id));

    if (!event) return;

    const isRegistered = registrations.some(
        item => item.eventId === event.id
    );

    detailsContent.innerHTML = `
        <div style="font-size:55px; margin-bottom:10px;">
            ${event.icon}
        </div>

        <span class="event-count">${event.category}</span>

        <h2 style="margin-top:18px;">${event.title}</h2>

        <p style="margin:15px 0;">${event.description}</p>

        <div class="event-meta" style="margin-top:20px;">
            <span>📅 Date: ${formatDate(event.date)}</span>
            <span>⏰ Time: ${event.time}</span>
            <span>📍 Venue: ${event.venue}</span>
            <span>👤 Organizer: ${event.organizer}</span>
        </div>

        <button class="primary-btn full-btn"
            id="detailsRegisterBtn"
            ${isRegistered ? "disabled" : ""}>
            ${isRegistered ? "Already Registered" : "Register for Event"}
        </button>
    `;

    detailsModal.classList.add("show");

    document.getElementById("detailsRegisterBtn")
        .addEventListener("click", () => {
            if (!isRegistered) {
                detailsModal.classList.remove("show");
                openRegistration(id);
            }
        });
}

// 8. Open Student Registration Form
function openRegistration(id) {
    const event = events.find(item => item.id === Number(id));

    if (!event) return;

    if (new Date(event.date + "T23:59:59") < new Date()) {
        showToast("Registration for this event has ended.");
        return;
    }

    if (registrations.some(item => item.eventId === event.id)) {
        showToast("You have already registered for this event.");
        return;
    }

    registrationForm.reset();
    document.getElementById("selectedEventId").value = event.id;

    registerModal.classList.add("show");
}

// 9. Submit Student Registration
registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const eventId = Number(
        document.getElementById("selectedEventId").value
    );

    const selectedEvent = events.find(item => item.id === eventId);

    if (!selectedEvent) {
        showToast("Event not found.");
        return;
    }

    if (new Date(selectedEvent.date + "T23:59:59") < new Date()) {
        showToast("Registration for this event has ended.");
        registerModal.classList.remove("show");
        return;
    }

    if (registrations.some(item => item.eventId === eventId)) {
        showToast("You have already registered.");
        registerModal.classList.remove("show");
        return;
    }

    const student = {
        name: document.getElementById("studentName").value.trim(),
        roll: document.getElementById("studentRoll").value.trim(),
        email: document.getElementById("studentEmail").value.trim(),
        department: document.getElementById("studentDept").value
    };

    if (!student.name || !student.roll ||
        !student.email || !student.department) {
        showToast("Please fill in all student details.");
        return;
    }

    // Store event and student information
    const registration = {
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        eventDate: selectedEvent.date,
        student: student,
        status: "Registered",
        registeredOn: new Date().toISOString()
    };

    registrations.push(registration);

    saveRegistrations();

    registerModal.classList.remove("show");

    renderRegistrations();
    filterEvents();

    showToast("Registration successful! 🎉");
});

// 10. Display My Registrations
function renderRegistrations() {
    registrationList.innerHTML = "";

    registrationCount.textContent =
        `${registrations.length} Registered`;

    if (registrations.length === 0) {
        registrationList.innerHTML = `
            <div class="empty-state">
                <h3>📋 No Registrations Yet</h3>
                <p>Explore upcoming events and register for your favourites!</p>
            </div>
        `;
        return;
    }

    registrations.forEach(registration => {
        const card = document.createElement("div");
        card.className = "registration-card";

        card.innerHTML = `
            <div>
                <h3>${registration.eventTitle}</h3>
                <p>📅 ${formatDate(registration.eventDate)}</p>
                <p>👤 ${registration.student.name}</p>
                <p>🆔 ${registration.student.roll}</p>
                <p style="color:#198754; font-weight:bold;">
                    ✓ ${registration.status}
                </p>
            </div>

            <button class="cancel-btn"
                data-action="cancel"
                data-id="${registration.eventId}">
                Cancel Registration
            </button>
        `;

        registrationList.appendChild(card);
    });
}

// 11. Cancel Registration
function cancelRegistration(id) {
    const registration = registrations.find(
        item => item.eventId === Number(id)
    );

    if (!registration) return;

    const confirmed = confirm(
        `Are you sure you want to cancel your registration for ${registration.eventTitle}?`
    );

    if (!confirmed) return;

    registrations = registrations.filter(
        item => item.eventId !== Number(id)
    );

    saveRegistrations();

    renderRegistrations();
    filterEvents();

    showToast("Registration cancelled successfully.");
}

// 12. Handle Event Card and Registration Actions
eventGrid.addEventListener("click", function(event) {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const id = button.dataset.id;

    if (button.dataset.action === "details") {
        showEventDetails(id);
    }

    if (button.dataset.action === "register") {
        openRegistration(id);
    }
});

// 13. Handle Cancellation Actions
registrationList.addEventListener("click", function(event) {
    const button = event.target.closest("button[data-action='cancel']");

    if (!button) return;

    cancelRegistration(button.dataset.id);
});

// 14. Close Modals
document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => {
        document.getElementById(button.dataset.close)
            .classList.remove("show");
    });
});

// Close modal by clicking outside it
document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});

// Close modal using Escape key
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal.show").forEach(modal => {
            modal.classList.remove("show");
        });
    }
});

// 15. Toast Notification
let toastTimer;

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// 16. Mobile Navigation Menu
document.getElementById("menuBtn").addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".nav-links").classList.remove("open");
    });
});

// 17. Initial Application Setup
function initializeApp() {
    displayEvents(events);
    renderRegistrations();
}

initializeApp();
