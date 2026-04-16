const toggle = document.getElementById("theme-toggle");
toggle?.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

const logoutBtn = document.getElementById("logout-button");
logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("auth");
  window.location.href = "index.html";
});

const spinner = document.getElementById("spinner");
const showSpinner = () => spinner?.classList.remove("hidden");
const hideSpinner = () => spinner?.classList.add("hidden");

const toast = document.getElementById("toast");
const showToast = () => {
  toast?.classList.add("show");
  setTimeout(() => toast?.classList.remove("show"), 2000);
};

const form = document.getElementById("login-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    showSpinner();

    setTimeout(() => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email === "demo@company.com" && password === "password123") {
        localStorage.setItem("auth", "true");
        window.location.href = "dashboard.html";
      } else {
        document.getElementById("error").classList.remove("hidden");
      }

      hideSpinner();
    }, 800);
  });
}

function seedItems() {
  const itemsList = document.getElementById("items");
  if (!itemsList) return;

  ["Welcome Item", "Demo Product"].forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    itemsList.appendChild(li);
  });
}

seedItems();

const newBtn = document.getElementById("new-item");
const formDiv = document.getElementById("item-form");
const saveBtn = document.getElementById("save");

newBtn?.addEventListener("click", () => {
  formDiv.classList.remove("hidden");
});

saveBtn?.addEventListener("click", () => {
  showSpinner();

  setTimeout(() => {
    const name = document.getElementById("item-name").value;

    const itemsList = document.getElementById("items");
    if (itemsList) {
      const li = document.createElement("li");
      li.textContent = name;
      itemsList.appendChild(li);
    }

    formDiv.classList.add("hidden");
    hideSpinner();
    showToast();
  }, 700);
});

// auth guard
if (window.location.pathname.includes("dashboard") ||
    window.location.pathname.includes("products")) {
  if (!localStorage.getItem("auth")) {
    window.location.href = "index.html";
  }
}
