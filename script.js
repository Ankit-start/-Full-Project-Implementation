// Navigation
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => {
    sec.classList.add("hidden");
    sec.classList.remove("active");
  });
  document.getElementById(id).classList.remove("hidden");
  document.getElementById(id).classList.add("active");
}

// To-Do List
function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    renderTasks();
  }
}

function renderTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };
    list.appendChild(li);
  });
}

renderTasks();

// Product Listing
const products = [
  { name: "Smartphone", category: "tech", rating: 4.5 },
  { name: "Jeans", category: "fashion", rating: 3.8 },
  { name: "Laptop", category: "tech", rating: 4.8 },
  { name: "Sneakers", category: "fashion", rating: 4.2 }
];

function renderProducts() {
  const category = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("sortRating").value;
  let filtered = products;

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  filtered.sort((a, b) => sort === "high" ? b.rating - a.rating : a.rating - b.rating);

  const list = document.getElementById("productList");
  list.innerHTML = "";
  filtered.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.name} - Rating: ${p.rating}`;
    list.appendChild(li);
  });
}

document.getElementById("categoryFilter").onchange = renderProducts;
document.getElementById("sortRating").onchange = renderProducts;

renderProducts();