import { fireEvent, render, screen } from "@testing-library/react";
import { TodoAdd } from "../todoAdd";

const cursorProp = {
  onButtonEnabled: "cursor: pointer",
  onButtonDisabled: "cursor: not-allowed",
};

describe("todoAdd component", () => {
  it("should render elements with expected behaviour", () => {
    render(<TodoAdd />);

    const appBarIcon = screen.getByTestId("ChecklistOutlinedIcon");
    expect(appBarIcon).toBeInTheDocument();

    const appBarHeading = screen.getByTitle("todoBar");
    expect(appBarHeading).toHaveTextContent("To Do");

    const textField = screen.getByLabelText("Add a text");
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveDisplayValue(""); // empty input at start

    const addButton = screen.getByRole("button", { name: "Add" });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeDisabled();
    fireEvent.mouseOver(addButton);
    expect(addButton).toHaveStyle(cursorProp.onButtonDisabled);

    const addIcon = screen.getByTestId("AddIcon");
    expect(addIcon).toBeInTheDocument();

    const table = screen.queryByRole("table");
    expect(table).not.toBeInTheDocument();
  });

  it("should render the table with todos saved when the input given is a combination of different characters", () => {
    render(<TodoAdd />);

    const inputs = [
      " qweur dvhdiv dkcjdi ",
      " 122e frgr  @% 787    ",
      "][45tRGRTJ7     K68KL.IcAF F/",
    ];

    let input;
    for (input of inputs) {
      const textField = screen.getByLabelText("Add a text");
      fireEvent.change(textField, { target: { value: input } }); //logRoles(textField)
      expect(textField).toHaveDisplayValue(input);

      const addButton = screen.getByRole("button", { name: "Add" });
      expect(addButton).toBeEnabled();
      fireEvent.mouseOver(addButton);
      expect(addButton).toHaveStyle(cursorProp.onButtonEnabled);
      fireEvent.submit(textField, { key: "Enter" });
      expect(textField).toHaveDisplayValue("");
    }

    let index;
    for (index in inputs) {
      const todoNote = screen.getByTitle(`todoItem-${index}`);
      expect(todoNote.textContent).toBe(
        inputs[inputs.length - 1 - parseInt(index)].trim(),
      );
    }
  });

  it("should not render the table when the input given contains only spaces", () => {
    render(<TodoAdd />);

    const input = "    ";

    const textField = screen.getByLabelText("Add a text");
    fireEvent.change(textField, { target: { value: input } });
    expect(textField).toHaveDisplayValue(input);

    const addButton = screen.getByRole("button", { name: "Add" });
    expect(addButton).toBeDisabled();
    fireEvent.mouseOver(addButton);
    expect(addButton).toHaveStyle(cursorProp.onButtonDisabled);
    fireEvent.click(addButton);
    expect(textField).toHaveDisplayValue(input);

    fireEvent.submit(textField, { key: "Enter" });
    expect(textField).toHaveDisplayValue(input);

    const table = screen.queryByRole("table");
    expect(table).not.toBeInTheDocument();
  });

  it("should render the button as completed 9+ when more than 9 todos are marked as completed", () => {
    render(<TodoAdd />);

    const inputs = [
      " qweur dvhdiv dkcjdi ",
      " 122e frgr  @% 787    ",
      "][45tRGRTJ7     K68KL.IcAF F/",
      "dwdqwd",
      "qwdqwd",
      "qdqwdwqdqw",
      "qwdqwdw3e3",
      "wdqe3d3",
      "efr342fdf23df",
      "weqdewdd",
    ];

    let input;
    for (input of inputs) {
      const textField = screen.getByLabelText("Add a text");
      fireEvent.change(textField, { target: { value: input } });
      expect(textField).toHaveDisplayValue(input);

      const addButton = screen.getByRole("button", { name: "Add" });
      expect(addButton).toBeEnabled();
      fireEvent.click(addButton);
      expect(textField).toHaveDisplayValue("");
    }

    let index;
    for (index in inputs) {
      const todoNote = screen.getByTitle(`todoItem-${index}`);
      expect(todoNote.textContent).toBe(
        inputs[inputs.length - 1 - parseInt(index)].trim(),
      );
    }

    for (let i = 0; i < inputs.length; i++) {
      const radioButton = screen.getByDisplayValue(`radioButton-0`);
      fireEvent.click(radioButton);
    }

    const table = screen.queryByRole("table");
    expect(table).not.toBeInTheDocument();

    const expandButton = screen.getByRole("button", { name: "Completed 9+" });
    expect(expandButton).toBeInTheDocument();
    fireEvent.click(expandButton);

    for (let j = 0; j < inputs.length; j++) {
      const completedItem = screen.getByTitle(`completedTodoItem-${j}`);
      expect(completedItem.textContent).toBe(inputs[j].trim());
    }
  });

  it("should update the edited item only", () => {
    render(<TodoAdd />);

    const inputs = [
      " qweur dvhdiv dkcjdi ",
      " 122e frgr  @% 787    ",
      "][45tRGRTJ7     K68KL.IcAF F/",
      "dwdqwd",
      " qwdqwd ",
    ];

    let input;
    for (input of inputs) {
      const textField = screen.getByLabelText("Add a text");
      fireEvent.change(textField, { target: { value: input } });
      expect(textField).toHaveDisplayValue(input);

      const addButton = screen.getByRole("button", { name: "Add" });
      expect(addButton).toBeEnabled();
      fireEvent.click(addButton);
      expect(textField).toHaveDisplayValue("");
    }

    const todoNote = screen.getByTitle("todoItem-0");
    expect(todoNote.textContent).toBe(inputs[inputs.length - 1].trim());

    const editButton = screen.getByTitle("editButton-0");
    fireEvent.click(editButton);

    const editField = screen.getByTitle("editField");
    expect(editField.textContent).toBe(inputs[inputs.length - 1].trim());

    const userInput = " wqdiuhqu owjdoijq ";
    fireEvent.change(editField, { target: { value: userInput } });
    expect(editField.textContent).toBe(userInput);

    const saveButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);

    const closedField = screen.queryByTitle("editField");
    expect(closedField).not.toBeInTheDocument();

    const updatedNote = screen.getByTitle("todoItem-0");
    expect(updatedNote.textContent).toBe(userInput.trim());

    for (let i = 1; i < inputs.length; i++) {
      const unUpdatedNote = screen.getByTitle(`todoItem-${i}`);
      expect(unUpdatedNote.textContent).toBe(
        inputs[inputs.length - 1 - i].trim(),
      );
    }
  });
});
