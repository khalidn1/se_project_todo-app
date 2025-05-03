import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { FormValidator } from "../components/FormValidator.js";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = document.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const renderTodo = (data) => {
  const todoElement = generateTodo(data);
  todosList.append(todoElement);
};

function openModal(modal) {
  modal.classList.add("popup_visible");
}

function closeModal(modal) {
  modal.classList.remove("popup_visible");
}

function generateTodo(data) {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
}

addTodoButton.addEventListener("click", () => openModal(addTodoPopup));
addTodoCloseBtn.addEventListener("click", () => closeModal(addTodoPopup));

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = addTodoForm.name.value;
  const date = addTodoForm.date.value;

  const todoData = {
    id: uuidv4(),
    name,
    completed: false,
    date: date ? new Date(date).toISOString() : null,
  };

  renderTodo(todoData);
  addTodoForm.reset();
  addTodoFormValidator.resetValidation();
  closeModal(addTodoPopup);
});

const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

initialTodos.forEach((item) => {
  renderTodo(item);
});
