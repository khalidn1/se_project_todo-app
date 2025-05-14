import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import TodoCounter from "../components/TodoCounter.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { FormValidator } from "../components/formValidator.js";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleToggle(isChecked) {
  todoCounter.updateCompleted(isChecked);
}

function handleDelete(wasCompleted) {
  todoCounter.updateTotal(false);
  if (wasCompleted) {
    todoCounter.updateCompleted(false);
  }
}

function renderTodo(todoData) {
  const todoElement = new Todo(todoData, "#todo-template", {
    handleToggle,
    handleDelete,
  }).getView();
  todoSection.addItem(todoElement);
}

const todoSection = new Section(
  { items: initialTodos, renderer: renderTodo },
  ".todos__list"
);
todoSection.renderItems();

const addTodoForm = document.forms["add-todo-form"];

const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

const addTodoPopup = new PopupWithForm("#add-todo-popup", (inputValues) => {
  const newTodo = {
    id: uuidv4(),
    name: inputValues.name,
    completed: false,
    date: inputValues.date ? new Date(inputValues.date).toISOString() : null,
  };

  renderTodo(newTodo);
  todoCounter.updateTotal(true);

  addTodoFormValidator.resetValidation();
  addTodoPopup.close();
});
addTodoPopup.setEventListeners();

document
  .querySelector(".button_action_add")
  .addEventListener("click", () => addTodoPopup.open());
