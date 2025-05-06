import { fireEvent, render, screen } from "@testing-library/react";
import { TodoCompleted } from "../todoCompleted";

describe("todoCompleted component", () => {
  it("should render elements correctly when a todo is marked as completed", () => {
    const completedTodoItem = { note: "1233e 3e3e3ded *323{]3e3[303" };
    render(
      <TodoCompleted
        completedTodoItem={completedTodoItem}
        addBackToTheTodoItemList={jest.fn()}
      />,
    );

    const expandMoreButton = screen.getByRole("button", {
      name: "Completed 1",
    });
    expect(expandMoreButton).toBeInTheDocument();
    expect(expandMoreButton).toHaveAttribute("aria-expanded", "false"); // initially not expanded

    const expandMoreIcon = screen.getByTestId("ExpandMoreIcon");
    expect(expandMoreIcon).toBeInTheDocument();

    const table = screen.queryByRole("table");
    expect(table).not.toBeInTheDocument();

    fireEvent.click(expandMoreButton);
    expect(expandMoreButton).toHaveAttribute("aria-expanded", "true"); // now expanded

    const completedList = screen.getByRole("table");
    expect(completedList).toBeInTheDocument();

    const checkBox = screen.getByDisplayValue("checkBox-0");
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).toBeChecked();

    const completedItem = screen.getByTitle("completedTodoItem-0");
    expect(completedItem.textContent).toBe(completedTodoItem.note);

    const deleteButton = screen.getByTitle("deleteCompletedButton-0");
    expect(deleteButton).toBeInTheDocument();

    const deleteIcon = screen.getByTestId("DeleteIcon");
    expect(deleteIcon).toBeInTheDocument();
  });

  it("should be able to mark todo as incomplete", () => {
    const completedTodoItem = { note: "1233e 3e3e3ded *323{]3e3[303" };
    const addBackToTheTodoItemList = jest.fn();
    render(
      <TodoCompleted
        completedTodoItem={completedTodoItem}
        addBackToTheTodoItemList={addBackToTheTodoItemList}
      />,
    );

    const expandMoreButton = screen.getByRole("button", {
      name: "Completed 1",
    });
    fireEvent.click(expandMoreButton);

    const completedItem = screen.getByTitle("completedTodoItem-0");
    expect(completedItem.textContent).toBe(completedTodoItem.note);

    const checkBox = screen.getByDisplayValue("checkBox-0");
    fireEvent.click(checkBox);

    const markedAsIncompleteItem = screen.queryByTitle("completedTodoItem-0");
    expect(markedAsIncompleteItem).not.toBeInTheDocument();
    expect(addBackToTheTodoItemList).toHaveBeenCalledTimes(1);
    expect(addBackToTheTodoItemList).toHaveBeenCalledWith(
      completedTodoItem.note,
    );

    const expandButton = screen.queryByRole("button", {
      name: /^Completed \d+$/,
    });
    expect(expandButton).not.toBeInTheDocument();
  });

  it("should be able to delete completed todo", () => {
    const completedTodoItem = { note: "1233e 3e3e3ded *323{]3e3[303" };
    render(
      <TodoCompleted
        completedTodoItem={completedTodoItem}
        addBackToTheTodoItemList={jest.fn()}
      />,
    );

    const expandMoreButton = screen.getByRole("button", {
      name: "Completed 1",
    });
    fireEvent.click(expandMoreButton);

    const completedItem = screen.getByTitle("completedTodoItem-0");
    expect(completedItem.textContent).toBe(completedTodoItem.note);

    const deleteButton = screen.getByTitle("deleteCompletedButton-0");
    fireEvent.click(deleteButton);

    const deletedTodoNote = screen.queryByTitle("completedTodoItem-0");
    expect(deletedTodoNote).not.toBeInTheDocument();
  });
});
