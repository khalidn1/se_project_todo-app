import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { FormValidator } from "../components/FormValidator.js";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.querySelector(".popup__form");
const addTodoCloseBtn = document.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

function openModal(modal) {
  modal.classList.add("popup_visible");
  if (modal === addTodoPopup) {
    addTodoForm.reset();
    addTodoFormValidator.resetValidation();
  }
}

function closeModal(modal) {
  modal.classList.remove("popup_visible");
}

function generateTodo(data) {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
}

addTodoButton.addEventListener("click", function () {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", function () {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const name = addTodoForm.name.value;
  const date = addTodoForm.date.value;

  const todoData = {
    id: uuidv4(),
    name: name,
    completed: false,
    date: date ? new Date(date).toISOString() : null,
  };

  const todoElement = generateTodo(todoData);
  todosList.append(todoElement);

  addTodoForm.reset();

  addTodoFormValidator.resetValidation();

  closeModal(addTodoPopup);
});

const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

initialTodos.forEach(function (item) {
  const todoElement = generateTodo(item);
  todosList.append(todoElement);
});
