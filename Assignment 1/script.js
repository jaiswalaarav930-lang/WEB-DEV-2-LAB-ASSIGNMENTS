const form = document.getElementById("eventForm");
const eventList = document.getElementById("eventList");
const clearBtn = document.getElementById("clearBtn");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // GET VALUES FROM LEFT SIDE FORM     
  const title = document.getElementById("title").value.trim();
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();

  
  // REMOVE EMPTY MESSAGE FROM RIGHT SIDE
  const emptyMsg = eventList.querySelector(".empty");
  if (emptyMsg) emptyMsg.remove();

  // CREATE RIGHT SIDE EVENT CARD
  const eventCard = document.createElement("div");
  eventCard.className = "event";

  eventCard.innerHTML = `
    <h3>${title}</h3>
    <small>${date} | ${category}</small>
    <p>${description || "No description provided"}</p>
    <button class="delete">Delete</button>
  `;

  // APPEND TO RIGHT SIDE
  eventList.appendChild(eventCard);

  // CLEAR LEFT SIDE FORM
  form.reset();
});

// DELETE SINGLE EVENT
eventList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();

    if (!eventList.querySelector(".event")) {
      eventList.innerHTML =
        "<p class='empty'>No events added yet.</p>";
    }
  }
});

// CLEAR ALL EVENTS
clearBtn.addEventListener("click", function () {
  eventList.innerHTML =
    "<p class='empty'>No events added yet.</p>";
});


 