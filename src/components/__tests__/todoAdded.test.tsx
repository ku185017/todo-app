import { fireEvent, render, screen } from "@testing-library/react";
import { TodoAdded } from "../todoAdded";

describe("todoAdded component", () => {
  it("should render elements correctly when the input is not submitted", () => {
    render(
      <TodoAdded
        inputSubmitted={false}
        clearTodoNote={jest.fn()}
        todoNote="cew efce"
      />,
    );

    const table = screen.queryByRole("table");
    expect(table).not.toBeInTheDocument();

    const todo = screen.queryByTitle(/^todoItem-\d+$/);
    expect(todo).not.toBeInTheDocument();
  });

  it("should render elements correctly when the input is submitted", () => {
    const note = "  ewfwe   rfref  ";
    const clearTodoNote = jest.fn();
    render(
      <TodoAdded
        inputSubmitted={true}
        clearTodoNote={clearTodoNote}
        todoNote={note}
      />,
    );

    expect(clearTodoNote).toHaveBeenCalledTimes(1);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    const titleHeader = screen.getByRole("columnheader", { name: "Title" });
    expect(titleHeader).toBeInTheDocument();

    const emptyHeader = screen.getAllByRole("columnheader", { name: "" });
    expect(emptyHeader).toHaveLength(3);

    const radioButtons = screen.getAllByRole("radio");
    expect(radioButtons).toHaveLength(1);

    const radioButton = screen.getByDisplayValue("radioButton-0");
    expect(radioButton).not.toBeChecked();

    const todoNote = screen.getByTitle("todoItem-0");
    expect(todoNote.textContent).toBe(note.trim());

    const deleteButtons = screen.getAllByRole("button", { name: "Delete" });
    expect(deleteButtons).toHaveLength(1);

    const editButtons = screen.getAllByRole("button", { name: "Edit" });
    expect(editButtons).toHaveLength(1);

    const editIcons = screen.getAllByTestId("EditIcon");
    expect(editIcons).toHaveLength(1);

    const deleteIcons = screen.getAllByTestId("DeleteIcon");
    expect(deleteIcons).toHaveLength(1);
  });

  it("should be able to edit todoItem", () => {
    const note = "  ewfwe   rfref  ";
    const clearTodoNote = jest.fn();
    render(
      <TodoAdded
        inputSubmitted={true}
        clearTodoNote={clearTodoNote}
        todoNote={note}
      />,
    );

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    const todoNote = screen.getByTitle("todoItem-0");
    expect(todoNote.textContent).toBe(note.trim());

    const editButton = screen.getByTitle("editButton-0");
    fireEvent.click(editButton);

    const editField = screen.getByRole("textbox");
    expect(editField.textContent).toBe(note.trim());

    const input = "ewodjwi downd";
    fireEvent.change(editField, { target: { value: input } });
    expect(editField.textContent).toBe(input);

    const saveButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);

    const editedNote = screen.getByTitle("todoItem-0");
    expect(editedNote.textContent).toBe(input.trim());

    const closedField = screen.queryByRole("textbox");
    expect(closedField).not.toBeInTheDocument();
  });

  it("should not update the todo if the user has not pressed save", () => {
    const note = "  ewfwe   rfref  ";
    render(
      <TodoAdded
        inputSubmitted={true}
        clearTodoNote={jest.fn()}
        todoNote={note}
      />,
    );

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    const todoNote = screen.getByTitle("todoItem-0");
    expect(todoNote.textContent).toBe(note.trim());

    const editButton = screen.getByTitle("editButton-0");
    fireEvent.click(editButton);

    const editField = screen.getByRole("textbox");
    expect(editField.textContent).toBe(note.trim());

    const input = "ewodjwi downd";
    fireEvent.change(editField, { target: { value: input } });
    expect(editField.textContent).toBe(input);

    const closeButton = screen.getByTitle("close");
    fireEvent.click(closeButton);
    expect(todoNote.textContent).toBe(note.trim());
  });

  it("should be able to delete todoItem while editing", () => {
    const note = "  ewfwe   rfref  ";
    render(
      <TodoAdded
        inputSubmitted={true}
        clearTodoNote={jest.fn()}
        todoNote={note}
      />,
    );

    const todoNote = screen.getByTitle("todoItem-0");
    expect(todoNote.textContent).toBe(note.trim());

    const editButton = screen.getByTitle("editButton-0");
    fireEvent.click(editButton);

    const editField = screen.getByRole("textbox");
    expect(editField.textContent).toBe(note.trim());

    const deleteButton = screen.getByTitle("delete-onEdit");
    fireEvent.click(deleteButton);

    const closedField = screen.queryByRole("textbox");
    expect(closedField).not.toBeInTheDocument();

    const deletedTodo = screen.queryByTitle("todoItem-0");
    expect(deletedTodo).not.toBeInTheDocument();
  });

  it("should close editField on closing and no other actions", () => {
    const note = "  ewfwe   rfref  ";
    render(
      <TodoAdded
        inputSubmitted={true}
        clearTodoNote={jest.fn()}
        todoNote={note}
      />,
    );

    const todoNote = screen.getByTitle("todoItem-0");
    expect(todoNote.textContent).toBe(note.trim());

    const editButton = screen.getByTitle("editButton-0");
    fireEvent.click(editButton);

    const editField = screen.getByRole("textbox");
    expect(editField.textContent).toBe(note.trim());

    const closeButton = screen.getByTitle("close");
    fireEvent.click(closeButton);

    const closedField = screen.queryByRole("textbox");
    expect(closedField).not.toBeInTheDocument();

    expect(todoNote).toBeInTheDocument();
    expect(todoNote.textContent).toBe(note.trim());
  });

  it("should mark todoItem as completed", () => {
    const note = "  ewfwe   rfref  ";
    render(
      <TodoAdded
        inputSubmitted={true}
        clearTodoNote={jest.fn()}
        todoNote={note}
      />,
    );

    const todoNote = screen.getByTitle("todoItem-0");
    expect(todoNote.textContent).toBe(note.trim());

    const radioButton = screen.getByDisplayValue("radioButton-0");
    fireEvent.click(radioButton);
    const completedTodoNote = screen.queryByTitle("todoItem-0");
    expect(completedTodoNote).not.toBeInTheDocument();

    const expandMoreButton = screen.getByRole("button", {
      name: "Completed 1",
    });
    expect(expandMoreButton).toBeInTheDocument();
    fireEvent.click(expandMoreButton);

    const completedTodoItem = screen.getByTitle("completedTodoItem-0"); // ? means 0 or 1 time
    expect(completedTodoItem.textContent).toBe(note.trim());
  });

  it("should be able to mark completed todo as incomplete", () => {
    const note = "  ewfwe   rfref  ";
    render(
      <TodoAdded
        inputSubmitted={true}
        clearTodoNote={jest.fn()}
        todoNote={note}
      />,
    );

    const todoNote = screen.getByTitle("todoItem-0");
    expect(todoNote.textContent).toBe(note.trim());

    const radioButton = screen.getByDisplayValue("radioButton-0");
    fireEvent.click(radioButton);

    const markedCompleted = screen.queryByTitle("todoItem-0");
    expect(markedCompleted).not.toBeInTheDocument();

    const expandMoreButton = screen.getByRole("button", {
      name: "Completed 1",
    });
    expect(expandMoreButton).toBeInTheDocument();
    fireEvent.click(expandMoreButton);

    const completedTodoItem = screen.getByTitle("completedTodoItem-0");
    expect(completedTodoItem.textContent).toBe(note.trim());

    const checkBox = screen.getByDisplayValue("checkBox-0");
    fireEvent.click(checkBox);

    const markedIncompleted = screen.queryByTitle("completedTodoItem-0");
    expect(markedIncompleted).not.toBeInTheDocument();

    const todo = screen.getByTitle("todoItem-0");
    expect(todo).toBeInTheDocument();
    expect(todo.textContent).toBe(note.trim());
  });

  it("should be able to delete todoItem", () => {
    const note = "  ewfwe   rfref  ";
    render(
      <TodoAdded
        inputSubmitted={true}
        clearTodoNote={jest.fn()}
        todoNote={note}
      />,
    );

    const todoNote = screen.getByTitle("todoItem-0");
    expect(todoNote.textContent).toBe(note.trim());

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(deleteButton);

    const deletedTodoNote = screen.queryByTitle("todoItem-0");
    expect(deletedTodoNote).not.toBeInTheDocument();
  });
});
