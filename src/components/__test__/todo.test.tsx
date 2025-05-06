import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "../todo";

describe("Todo", () => {
  it("Should render todo component", async () => {
    render(<Todo />);

    //check if all components are being displayed.
    const textElement = screen.getByRole("textbox");
    expect(textElement).toBeInTheDocument();

    const buttonElement = screen.getByTitle("AddButton");
    expect(buttonElement).toBeInTheDocument();

    const completedHeading = screen.getByText(/Completed/i);
    expect(completedHeading).toBeInTheDocument();
  });

  it("Should check if add button gets enabled on change in text area", async () => {
    render(<Todo />);
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: "hello there" } });
    const buttonElement = screen.getByTitle("AddButton");
    expect(buttonElement).toBeEnabled();
  });

  it("Should check if add button gets disabled on enter key in text area", async () => {
    render(<Todo />);
    const textElement = screen.getByRole("textbox");
    fireEvent.submit(textElement);
    const buttonElement = screen.getByTitle("AddButton");
    expect(buttonElement).toBeDisabled();
  });

  it("Should check if add button gets disabled on click", async () => {
    render(<Todo />);

    //enter text in the text area
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: "hello there" } });

    //get the button element and press it
    const buttonElement = screen.getByTitle("AddButton");
    fireEvent.click(buttonElement);

    //Button should be disabled now
    expect(buttonElement).toBeDisabled();
  });

  it("Should check if add button gets disabled for typing space", async () => {
    render(<Todo />);

    //enter space in the text area
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: " " } });

    //get the button
    const buttonElement = screen.getByTitle("AddButton");
    expect(buttonElement).toBeDisabled();
  });

  it("Should check if clicking add button displays the checkbox", async () => {
    render(<Todo />);

    //enter text in the text area
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: "hello there" } });

    //get the button element and press it
    const buttonElement = screen.getByTitle("AddButton");
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
    const buttonElement = screen.getByTitle("AddButton");
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
    const buttonElement = screen.getByTitle("AddButton");
    fireEvent.click(buttonElement);

    //check the checkbox of the "hello there" element
    const listItemElement = screen.getByRole("checkbox");
    fireEvent.click(listItemElement);

    //get the Completed heading, and click it.
    const completedHeading = screen.getByTitle("CompletedButton");
    fireEvent.click(completedHeading);

    //check if hello there is displayed now.
    const listItemCompletedElement = screen.getByText("hello there");
    expect(listItemCompletedElement).toBeInTheDocument();
  });

  it("Should check if checking checkbox in completed list adds element back in todo list", async () => {
    render(<Todo />);

    //enter text in the text area
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: "hello there" } });

    //get the button element and press it
    const buttonElement = screen.getByTitle("AddButton");
    fireEvent.click(buttonElement);

    //check the checkbox of the "hello there" element
    const listItemElement = screen.getByRole("checkbox");
    fireEvent.click(listItemElement);

    //get the Completed heading, and click it.
    const completedHeading = screen.getByTitle("CompletedButton");
    fireEvent.click(completedHeading);

    //check the checkbox of the completed "hello there" element
    const listItemCompletedElement = screen.getByRole("checkbox");
    fireEvent.click(listItemCompletedElement);

    //get the list item element again. This time, it should be added to todo list
    const removedElement = screen.queryByText("hello there");
    expect(removedElement).toBeInTheDocument();

    
  });

  it("Should check if clicking edit button makes text field visible", async() => {
    render(<Todo />);

    //enter text in the text area
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: "hello there" } });

    //get the button element and press it
    const buttonElement = screen.getByTitle("AddButton");
    fireEvent.click(buttonElement);

    //get the edit button and click it
    const editButton = screen.getByTitle("hello there")
    fireEvent.click(editButton)

    //check if text field is now visible
    const editTextField = screen.getByTitle("EditTextField")
    expect(editTextField).toBeInTheDocument();

  });

  it("Should check if entering text in the text field and clicking enter makes text field invisible", async() => {
    render(<Todo />);
    //enter text in the text area
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: "hello there" } });

    //get the button element and press it
    const buttonElement = screen.getByTitle("AddButton");
    fireEvent.click(buttonElement);

    //get the edit button and click it
    const editButton = screen.getByTitle("hello there")
    fireEvent.click(editButton)

    //Enter new text in the text field and press enter
    const editTextField = screen.getByTestId("hello there");
    fireEvent.change(editTextField, { target: { value: "how are you" } });
    fireEvent.keyDown(editTextField, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    //check for presence of text field
    const editTextField2 = screen.queryByTestId("EditTextField")
    expect(editTextField2).not.toBeInTheDocument()
  });

  it("Should check if editing the text and pressing enter removes the old text and replaces with new text", async() => {
    render(<Todo />);
    //enter text in the text area
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: "hello there" } });

    //get the button element and press it
    const buttonElement = screen.getByTitle("AddButton");
    fireEvent.click(buttonElement);

    //get the edit button and click it
    const editButton = screen.getByTitle("hello there")
    fireEvent.click(editButton)

    //Enter new text in the text field and press enter
    const editTextField = screen.getByTestId("hello there");
    fireEvent.change(editTextField, { target: { value: "how are you" } });
    fireEvent.submit(editTextField);

    //has old text disappeared?
    const getRemovedText = screen.queryByText("hello there");
    expect(getRemovedText).toBeNull();

    //has new text appeared on screen?
    const newListElement = screen.getByText("how are you");
    expect(newListElement).toBeInTheDocument();
  });

  it("Should check if entering space in edit text area does not take it as a new value", async() => {
    render(<Todo />);
    //enter text in the text area
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: "hello there" } });

    //get the button element and press it
    const buttonElement = screen.getByTitle("AddButton");
    fireEvent.click(buttonElement);

    //get the edit button and click it
    const editButton = screen.getByTitle("hello there")
    fireEvent.click(editButton)

    //Enter new text in the text field and press enter
    const editTextField = screen.getByTestId("hello there");
    fireEvent.change(editTextField, { target: { value: " " } });
    fireEvent.submit(editTextField);

    //does the old text still remain
    const getRemovedText = screen.getByText("hello there");
    expect(getRemovedText).toBeInTheDocument();

  });

  it("Should check if changing one element keeps the other elements unchanged", async() => {
    render(<Todo />);
    //enter text in the text area
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: "hello there" } });

    //get the button element and press it
    const buttonElement = screen.getByTitle("AddButton");
    fireEvent.click(buttonElement);

    //enter text in the text area
    const textElement2 = screen.getByRole("textbox");
    fireEvent.change(textElement2, { target: { value: "how are you" } });

    //get the button element and press it
    const buttonElement2 = screen.getByTitle("AddButton");
    fireEvent.click(buttonElement2);

    //get the edit button and click it
    const editButton = screen.getByTitle("hello there")
    fireEvent.click(editButton)

    //Enter new text in the text field and press enter
    const editTextField = screen.getByTestId("hello there");
    fireEvent.change(editTextField, { target: { value: "Bonjour" } });
    fireEvent.submit(editTextField);

    //has old text disappeared?
    const getRemovedText = screen.queryByText("hello there");
    expect(getRemovedText).toBeNull();

    //has new text appeared
    const editedListItem = screen.getByText("Bonjour");
    expect(editedListItem).toBeInTheDocument()

    //is the rest of it unchanged
    const newListElement = screen.getByText("how are you");
    expect(newListElement).toBeInTheDocument();
  });

  it("Should check if pressing delete button removes element from the list", async() => {
    render(<Todo />);
    //enter text in the text area
    const textElement = screen.getByRole("textbox");
    fireEvent.change(textElement, { target: { value: "hello there" } });

    //get the button element and press it
    const buttonElement = screen.getByTitle("AddButton");
    fireEvent.click(buttonElement);

    //get the delete button and press it
    const buttonDelete = screen.getByTitle("hello there delete");
    fireEvent.click(buttonDelete);

    //check if hello there is deleted
    const removed = screen.queryByText("hello there")
    expect(removed).toBeNull();
  });

});
