// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', loadTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Create task element and insert
function createTaskElement(taskValue) {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskValue));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add the icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);  
}

// Load tasks from LS
function loadTasks() {
  let tasks;
  if (localStorage.getItem('tasks') !== null) {
    console.log(localStorage.getItem('tasks'));
    
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function(taskValue) {
      createTaskElement(taskValue);
    })
  }
}


// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  //Create and add task
  createTaskElement(taskInput.value);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);
  
  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
    
  }
}

// Remove Task From LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') !== null) {
    tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach(function(task, index) {
      if (taskItem.textContent === task) {
        tasks.splice(index, 1);
      }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

}

// Clear tasks
function clearTasks() {
  // taskList.innerHTML = ''; é umas das opções 

  // a mais rápida é esta
  // https://jspert.com/innerhtml-vs-removechild
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear tasks from LS
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  if (localStorage.getItem('tasks') !== null) {
    console.log(localStorage.getItem('tasks'));
    
    localStorage.removeItem('tasks');
  }
}

// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
    
  });
  
}