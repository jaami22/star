// Get references to DOM elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const totalTasksEl = document.getElementById("totalTasks");
const completedTasksEl = document.getElementById("completedTasks");
const pendingTasksEl = document.getElementById("pendingTasks");

// Array to hold tasks
let tasks = [];

// Add new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(task);
  taskInput.value = "";
  renderTasks();
  updateStats();
}

// Toggle task completed
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
  updateStats();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
  updateStats();
}

// Render tasks in the list
function renderTasks() {
  todoList.innerHTML = "";

  if (tasks.length === 0) {
    todoList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📝</div>
        <p>No tasks yet! Add one above to get started.</p>
      </div>
    `;
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    // Checkbox
    const checkbox = document.createElement("div");
    checkbox.className = `task-checkbox ${task.completed ? "checked" : ""}`;
    checkbox.addEventListener("click", () => toggleTask(task.id));

    // Task text
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "✕";
    delBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    todoList.appendChild(li);
  });
}

// Update stats (total, completed, pending)
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;

  totalTasksEl.textContent = total;
  completedTasksEl.textContent = completed;
  pendingTasksEl.textContent = pending;
}

// Event listeners
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

// Initial render
renderTasks();
updateStats();
