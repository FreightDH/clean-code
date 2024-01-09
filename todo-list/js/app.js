//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

let taskInput = document.querySelector(".input--new"); // Add a new task.
let addButton = document.querySelectorAll(".task__btn")[0]; // First button
let incompleteTaskHolder = document.querySelector(".list--incomplete"); // ul of #tasks-incomplete
let completedTasksHolder = document.querySelector(".list--complete"); //tasks-complete

//New task list item
let createNewTaskElement = function (taskString) {
	let listItem = document.createElement("li");
	listItem.className = "list__item";

	//input (checkbox)
	let checkBox = document.createElement("input"); //checkbox
	//label
	let label = document.createElement("label"); //label
	//input (text)
	let editInput = document.createElement("input"); //text
	//button.edit
	let editButton = document.createElement("button"); //edit button

	//button.delete
	let deleteButton = document.createElement("button"); //delete button
	let deleteButtonImg = document.createElement("img"); //delete button image

	label.innerText = taskString;
	label.className = "task__name";

	//Each elements, needs appending
	checkBox.type = "checkbox";
	checkBox.className = "checkbox";
	editInput.type = "text";
	editInput.className = "task__input";

	editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
	editButton.className = "task__btn";

	deleteButton.className = "task__btn btn--delete";
	deleteButtonImg.src = './assets/svg/remove.svg';
	deleteButton.appendChild(deleteButtonImg);

	//and appending.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}

let addTask = function () {
	console.log("Add Task...");
	//Create a new list item with the text from the #new-task:
	if (!taskInput.value) return;
	let listItem = createNewTaskElement(taskInput.value);

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";
}

//Edit an existing task.

let editTask = function () {
	console.log("Edit Task...");
	console.log("Change 'edit' to 'save'");

	let listItem = this.parentNode;

	let editInput = listItem.querySelector(".task__input");
	let label = listItem.querySelector(".task__name");
	let editBtn = listItem.querySelector(".task__btn");
	let containsClass = listItem.classList.contains("item--edit");
	//If class of the parent is .edit-mode
	if (containsClass) {
		//switch to .edit-mode
		//label becomes the inputs value.
		label.innerText = editInput.value;
		editBtn.innerText = "Edit";
	} else {
		editInput.value = label.innerText;
		editBtn.innerText = "Save";
	}

	//toggle .edit-mode on the parent.
	listItem.classList.toggle("item--edit");
};

//Delete task.
let deleteTask = function () {
	console.log("Delete Task...");

	let listItem = this.parentNode;
	let ul = listItem.parentNode;
	//Remove the parent list item from the ul.
	ul.removeChild(listItem);
}

//Mark task completed
let taskCompleted = function () {
	console.log("Complete Task...");

	//Append the task list item to the #tasks-complete
	let listItem = this.parentNode;
	this.parentNode.children[1].classList.add("name--complete");
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
}

let taskIncomplete = function () {
	console.log("Incomplete Task...");
	//Mark task as incomplete.
	//When the checkbox is unchecked
	//Append the task list item to the #tasks-incomplete
	let listItem = this.parentNode;
	this.parentNode.children[1].classList.remove("name--complete");
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

let ajaxRequest = function () {
	console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
	console.log("bind list item events");
	//select ListItems children
	let checkBox = taskListItem.querySelector(".checkbox");
	let editButton = taskListItem.querySelector(".task__btn");
	let deleteButton = taskListItem.querySelector(".btn--delete");

	//Bind editTask to edit button.
	editButton.onclick = editTask;
	//Bind deleteTask to delete button.
	deleteButton.onclick = deleteTask;
	//Bind taskCompleted to checkBoxEventHandler.
	checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
	//bind events to list items chldren(tasksCompleted)
	bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
	//bind events to list items chldren(tasks-complete)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.