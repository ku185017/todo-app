//naming convention: handler instead of handle
import { useState } from "react";
import { TodoInput } from "./TodoInput";
import { AddButton } from "./AddButton";
import Divider from "@mui/material/Divider";
import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";
import { TasksList } from "./TasksList";
import { CompletedTasksList } from "./CompletedTasksList";
import Button from "@mui/material/Button";
import { inputFormStyle, completedButtonStyle } from "./commonStyles";

const Todo = () => {
  const [todo, setTodo] = useState("");

  const [todoListArray, setTodoListArray] = useState<String[]>([]);

  const [completedListArray, setCompletedListArray] = useState<String[]>([]);

  const [showCompleted, setShowCompleted] = useState(false);

  const [isEditable, setIsEditable] = useState(-1);

  const [editTodo, setEditTodo] = useState("");

  const handleChangeTodo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.trim()) {
      setTodo(event.target.value);

      console.log("value is:", event.target.value);
    } else {
      setTodo(event.target.value);
      console.log("value is: ", event.target.value);
    }
  };

  const handleListItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim()) {
      setEditTodo(event.target.value);
      console.log("value is:", event.target.value);
    } else {
      setEditTodo(event.target.value);
      console.log("value is: ", event.target.value);
    }
  };

  const handleEditFormSubmit = (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (editTodo.trim()) {
      const updatedTodoArray = todoListArray.map((t, index) => {
        if (index === isEditable) {
          return editTodo;
        } else {
          return t;
        }
      });
      setTodoListArray(updatedTodoArray);
    }

    setIsEditable(-1);
    setEditTodo("");
  };

  const handleFormSubmitTodo = (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setTodoListArray([...todoListArray, todo.trim()]);
    setTodo("");
  };

  const handleAddButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //add todo to the list of todos.

    setTodoListArray([...todoListArray, todo.trim()]);
    setTodo("");
  };

  const handleTaskSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const taskID = parseInt(event.target.value);
    console.log(event.target);
    if (event.target.checked) {
      const currentTaskFromArray = todoListArray[taskID];

      const anotherArray = todoListArray.filter((t, index) => index !== taskID);
      console.log(anotherArray);

      setTodoListArray(anotherArray);

      setCompletedListArray([...completedListArray, currentTaskFromArray]);
    }
  };

  const handleCompletedTaskDeletion = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const completedtaskID = parseInt(event.target.value);
    if (event.target.checked) {
      const anotherArray = completedListArray.filter(
        (t, index) => index !== completedtaskID
      );
      setTodoListArray([...todoListArray, completedListArray[parseInt(completedtaskID.toString())].toString()]);
      setCompletedListArray(anotherArray);
    }
  };

  const showCompletedTasks = (event: React.MouseEvent<HTMLElement>) => {
    setShowCompleted(!showCompleted);
  };

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonElement = event.target as HTMLButtonElement;
    const eID = buttonElement.value as String;
    setIsEditable(parseInt(buttonElement.value));

    setEditTodo(todoListArray[parseInt(eID.toString())].toString());
  };

  return (
    <Divider
      className="App"
      textAlign="center"
      orientation="vertical"
      variant="middle"
      sx={{ width: "100%" }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todo List
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={inputFormStyle}>
        <Paper
          elevation={5}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            paddingTop: "0.5%",
            paddingBottom: "0.5%",
            paddingLeft: "0.5%",
            paddingRight: "0.2%",
            alignSelf: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <TodoInput
            value={todo}
            handleChange={handleChangeTodo}
            handleSubmit={handleFormSubmitTodo}
          />
          <AddButton
            addButtonClick={handleAddButtonClick}
            disabled={todo.trim() === ""}
          />
        </Paper>
      </Box>

      <TasksList
        todoListArray={todoListArray}
        handleTaskSelection={handleTaskSelection}
        handleEditClick={handleEditClick}
        handleChange={handleListItemChange}
        handleEnter={handleEditFormSubmit}
        isEditable={isEditable}
        value={editTodo}
      />

      <Divider orientation="vertical">
        <Button
          title="CompletedButton"
          //variant="outlined"
          
          onClick={showCompletedTasks}
          sx={completedButtonStyle}
        >
          Completed
        </Button>
      </Divider>

      <Box style={{ height: "20" }}></Box>

      <CompletedTasksList
        showCompleted={showCompleted}
        completedListArray={completedListArray}
        handleCompletedTaskDeletion={handleCompletedTaskDeletion}
      />
    </Divider>
  );
};

export default Todo;
