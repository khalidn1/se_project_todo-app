export class Todo {
  constructor(data, selector) {
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._selector = selector;
  }

  _setEventListeners() {
    const deleteButton = this._element.querySelector(".todo__delete-btn");
    const checkbox = this._element.querySelector(".todo__completed");

    deleteButton.addEventListener("click", () => {
      this._element.remove();
    });

    checkbox.addEventListener("change", () => {
      this._element.classList.toggle("todo_completed", checkbox.checked);
    });
  }

  getView() {
    const template = document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);

    this._element = template;

    const nameElement = this._element.querySelector(".todo__name");
    nameElement.textContent = this._name;

    const dateElement = this._element.querySelector(".todo__date");
    if (this._date) {
      const dateObj = new Date(this._date);
      dateElement.textContent = "Due: " + dateObj.toLocaleDateString();
    } else {
      dateElement.remove();
    }

    const checkbox = this._element.querySelector(".todo__completed");
    const label = this._element.querySelector(".todo__label");
    checkbox.id = `todo-${this._id}`;
    label.setAttribute("for", `todo-${this._id}`);

    this._setEventListeners();

    return this._element;
  }
}
