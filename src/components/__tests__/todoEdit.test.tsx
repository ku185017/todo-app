import { fireEvent, render, screen } from "@testing-library/react";
import { TodoEdit } from "../todoEdit";

describe("todoEdit component", () => {
  it("should render elements correctly when it has been opened", () => {
    const todoItem = { id: 0, note: "weidudi weiduhdiuw  edwdedw" };
    render(
      <TodoEdit
        edit={jest.fn()}
        remove={jest.fn()}
        close={jest.fn()}
        opened={true}
        todoItem={todoItem}
      />,
    );

    const editField = screen.getByRole("textbox");
    expect(editField.textContent).toBe(todoItem.note);

    const deleteButton = screen.getByTitle("delete-onEdit");
    expect(deleteButton).toBeInTheDocument();

    const deleteIcon = screen.getByTestId("DeleteIcon");
    expect(deleteIcon).toBeInTheDocument();

    const saveButton = screen.getByRole("button", { name: "Save" });
    expect(saveButton).toBeInTheDocument();

    const saveIcon = screen.getByTestId("SaveAsOutlinedIcon");
    expect(saveIcon).toBeInTheDocument();

    const closeIcon = screen.getByTestId("CloseOutlinedIcon");
    expect(closeIcon).toBeInTheDocument();

    const closeButton = screen.getByTitle("close");
    expect(closeButton).toBeInTheDocument();
  });

  it("should be able to take input from the user and will close on clicking close button", () => {
    const todoItem = { id: 0, note: "weidudi weiduhdiuw  edwdedw" };
    const close = jest.fn();
    render(
      <TodoEdit
        edit={jest.fn()}
        remove={jest.fn()}
        close={close}
        opened={true}
        todoItem={todoItem}
      />,
    );

    const editField = screen.getByRole("textbox");
    expect(editField.textContent).toBe(todoItem.note);

    const input = " wqdiuhqu owjdoijq ";
    fireEvent.change(editField, { target: { value: input } });
    expect(editField.textContent).toBe(input);

    const closeButton = screen.getByTitle("close");
    fireEvent.click(closeButton);
    expect(close).toHaveBeenCalledTimes(1);
  });

  it("should close on clicking delete button and will also delete the item", () => {
    const todoItem = { id: 0, note: "weidudi weiduhdiuw  edwdedw" };
    const close = jest.fn();
    const remove = jest.fn();
    render(
      <TodoEdit
        edit={jest.fn()}
        remove={remove}
        close={close}
        opened={true}
        todoItem={todoItem}
      />,
    );

    const editField = screen.getByRole("textbox");
    expect(editField.textContent).toBe(todoItem.note);

    const deleteButton = screen.getByTitle("delete-onEdit");
    fireEvent.click(deleteButton);

    expect(close).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledWith(todoItem.id);
  });

  it("should close on clicking save and will also update the item", () => {
    const todoItem = { id: 0, note: "weidudi weiduhdiuw  edwdedw" };
    const close = jest.fn();
    const edit = jest.fn();
    render(
      <TodoEdit
        edit={edit}
        remove={jest.fn()}
        close={close}
        opened={true}
        todoItem={todoItem}
      />,
    );

    const editField = screen.getByRole("textbox");
    expect(editField.textContent).toBe(todoItem.note);

    const input = "  eiwdh iuew diweuhd ";
    fireEvent.change(editField, { target: { value: input } });

    const saveButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);

    expect(close).toHaveBeenCalledTimes(1);
    expect(edit).toHaveBeenCalledTimes(1);
    expect(edit).toHaveBeenCalledWith(todoItem.id, input);
  });
});
