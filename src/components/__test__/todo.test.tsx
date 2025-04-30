import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "../todo";

describe("Todo", () => {
  it("Should render todo component", async () => {
    render(<Todo />);

    //check if all components are being displayed.
    const textElement = screen.getByRole("textbox");
    expect(textElement).toBeInTheDocument();

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();

    const completedHeading = screen.getByRole("heading", {
      name: /Completed/i,
    });
    expect(completedHeading).toBeInTheDocument();
  });

  it("Should check if add button gets enabled on change in text area", async () => {
    render(<Todo />);
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: "hello there" } });
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeEnabled();
  });

  it("Should check if add button gets disabled on enter key in text area", async () => {
    render(<Todo />);
    const textElement = screen.getByRole("textbox");
    fireEvent.keyDown(textElement, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });

  it("Should check if add button gets disabled on click", async () => {
    render(<Todo />);

    //enter text in the text area
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: "hello there" } });

    //get the button element and press it
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    //Button should be disabled now
    expect(buttonElement).toBeDisabled();
  });

  it("Should check if add button gets disabled for typing space", async() => {
    render(<Todo />);

    //enter space in the text area
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: " " } });

    //get the button
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });

  it("Should check if clicking add button displays the checkbox", async () => {
    render(<Todo />);

    //enter text in the text area
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: "hello there" } });

    //get the button element and press it
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    //get checkbox
    const check = screen.getByRole("checkbox");
    expect(check).toBeInTheDocument();
  });

  it("Should check if checking checkbox removes task from todo list", async () => {
    render(<Todo />);

    //enter text in the text area
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: "hello there" } });

    //get the button element and press it
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    //check the checkbox of the "hello there" element
    const listItemElement = screen.getByRole("checkbox");
    fireEvent.click(listItemElement);

    //get the list item element again. This time, it should not be visible.
    const removedElement = screen.queryByText("hello there");
    expect(removedElement).toBeNull();
  });

  it("Should check if checking check box and clicking the completed heading displays the completed list", async () => {
    render(<Todo />);

    //enter text in the text area
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: "hello there" } });

    //get the button element and press it
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    //check the checkbox of the "hello there" element
    const listItemElement = screen.getByRole("checkbox");
    fireEvent.click(listItemElement);

    //get the Completed heading, and click it.
    const completedHeading = screen.getByRole("heading");
    fireEvent.click(completedHeading);

    //check if hello there is displayed now.
    const listItemCompletedElement = screen.getByText("hello there");
    expect(listItemCompletedElement).toBeInTheDocument();
  });

  it("Should check if checking checkbox in completed list removes element", async () => {
    render(<Todo />);

    //enter text in the text area
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: "hello there" } });

    //get the button element and press it
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    //check the checkbox of the "hello there" element
    const listItemElement = screen.getByRole("checkbox");
    fireEvent.click(listItemElement);

    //get the Completed heading, and click it.
    const completedHeading = screen.getByRole("heading");
    fireEvent.click(completedHeading);

    //check the checkbox of the completed "hello there" element
    const listItemCompletedElement = screen.getByRole("checkbox");
    fireEvent.click(listItemCompletedElement);

    //get the list item element again. This time, it should not be visible.
    const removedElement = screen.queryByText("hello there");
    expect(removedElement).toBeNull();
  });
});


