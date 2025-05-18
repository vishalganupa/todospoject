let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  const title = document.getElementById("taskTitle").value;
  const priority = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;

  if (!title || !deadline) return alert("Title and Deadline required");

  const task = {
    title,
    priority,
    deadline,
    id: Date.now()
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  const status = document.getElementById("statusFilter").value;
  const priority = document.getElementById("priorityFilter").value;

  list.innerHTML = "";

  const today = new Date();

  tasks
    .filter(task => {
      const taskDate = new Date(task.deadline);
      if (status === "overdue" && taskDate >= today) return false;
      if (status === "upcoming" && taskDate < today) return false;
      if (priority !== "all" && task.priority !== priority) return false;
      return true;
    })
    .forEach(task => {
      const taskDate = new Date(task.deadline);
      const isOverdue = taskDate < today;
      const daysDiff = Math.ceil((taskDate - today) / (1000 * 60 * 60 * 24));

      const div = document.createElement("div");
      div.className = "task";

      div.innerHTML = `
        <div class="task-info">
          <strong>${task.title}</strong>
          <div class="meta">
            <span class="badge">${task.priority}</span>
            <span>${task.deadline}</span>
            <span class="${isOverdue ? "overdue" : "due-later"}">
              ${isOverdue ? "Overdue" : `Due in ${daysDiff} days`}
            </span>
          </div>
        </div>
        <div class="actions">
          <button onclick="deleteTask(${task.id})">🗑️</button>
        </div>
      `;

      list.appendChild(div);
    });
}

 
renderTasks();
