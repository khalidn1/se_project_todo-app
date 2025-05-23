export class Todo {
  constructor(data, selector, { handleToggle, handleDelete }) {
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._selector = selector;
    this._handleToggle = handleToggle;
    this._handleDelete = handleDelete;
    this._element = null;
  }

  _setEventListeners() {
    const deleteButton = this._element.querySelector(".todo__delete-btn");
    const checkbox = this._element.querySelector(".todo__completed");

    deleteButton.addEventListener("click", () => {
      const wasChecked = checkbox.checked;
      this._handleDelete(wasChecked);
      this._element.remove();
    });

    checkbox.addEventListener("change", () => {
      const isChecked = checkbox.checked;
      this._element.classList.toggle("todo_completed", isChecked);
      this._handleToggle(isChecked);
    });
  }

  getView() {
    this._element = document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);

    this._element.querySelector(".todo__name").textContent = this._name;

    const dateElement = this._element.querySelector(".todo__date");
    if (this._date) {
      const dateObj = new Date(this._date);
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      dateElement.textContent = `Due: ${dateObj.toLocaleDateString(
        "en-US",
        options
      )}`;
    } else {
      dateElement.remove();
    }

    const label = this._element.querySelector(".todo__label");
    checkbox.id = `todo-${this._id}`;
    label.setAttribute("for", checkbox.id);

    this._setEventListeners();
    return this._element;
  }
}
