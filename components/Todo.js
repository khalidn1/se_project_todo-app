export class Todo {
  constructor(data, selector, { handleToggle, handleDelete }) {
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._completed = data.completed;
    this._selector = selector;
    this._handleToggle = handleToggle;
    this._handleDelete = handleDelete;
    this._element = null;
    this._checkbox = null;
  }

  _setEventListeners() {
    const deleteButton = this._element.querySelector(".todo__delete-btn");

    deleteButton.addEventListener("click", () => {
      const wasChecked = this._checkbox.checked;
      this._handleDelete(wasChecked);
      this._element.remove();
    });

    this._checkbox.addEventListener("change", () => {
      const isChecked = this._checkbox.checked;
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
    this._checkbox = this._element.querySelector(".todo__completed");
    this._checkbox.checked = this._completed;

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

    this._setEventListeners();

    return this._element;
  }
}
