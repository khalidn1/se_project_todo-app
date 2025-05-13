import PopupWithForm from "./components/popupwithform.js";
import Section from "./components/section.js";
import TodoCounter from "./components/todoCounter.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { FormValidator } from "./components/formValidator.js";
import { initialTodos, validationConfig } from "./utils/constants.js";
import { Todo } from "./components/Todo.js";

const todoCounter = new TodoCounter(
  initialTodos,
  ".counter__text"
);

const todoSection = new Section({
  items: initialTodos,
  renderer: (todoData) => {
    const card = new Todo(todoData, "#todo-template", {
      handleToggle: (completed) => todoCounter.updateCompleted(completed),
      handleDelete: () => todoCounter.updateTotal(false),
    }).getView();
    todoSection.addItem(card);
  },
  containerSelector: ".todos__list",
});
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

  const newCard = new Todo(newTodo, "#todo-template", {
    handleToggle: (completed) => todoCounter.updateCompleted(completed),
    handleDelete: () => todoCounter.updateTotal(false),
  }).getView();

  todoSection.addItem(newCard);
  todoCounter.updateTotal(true);

  addTodoForm.reset();
  addTodoFormValidator.resetValidation();
  addTodoPopup.close();
});
addTodoPopup.setEventListeners();

const addTodoButton = document.querySelector(".button_action_add");
addTodoButton.addEventListener("click", () => addTodoPopup.open());
