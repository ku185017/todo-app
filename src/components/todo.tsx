import { useEffect, useState } from "react";
import { TodoInput } from "./TodoInput";
import { AddButton } from "./AddButton";
import Divider from "@mui/material/Divider";
import { TasksList } from "./TasksList";
import { CompletedTasksList } from "./CompletedTasksList";

const Todo = () => {
  const [todo, setTodo] = useState("");

  const [todoListArray, setTodoListArray] = useState<String[]>([]);

  const [completedListArray, setCompletedListArray] = useState<String[]>([]);

  const [showCompleted, setShowCompleted] = useState(false);

  const handleChangeTodo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.trim()) {
      setTodo(event.target.value);

      console.log("value is:", event.target.value);
    } else {
      setTodo(event.target.value);
      console.log("value is: ", event.target.value);
    }
  };

  const handleKeydownTodo = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      setTodoListArray([...todoListArray, todo.trim()]);
      setTodo("");
    }
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

      setCompletedListArray(anotherArray);
    }
  };

  const showCompletedTasks = (event: React.MouseEvent<HTMLElement>) => {
    setShowCompleted(!showCompleted);
  };

  useEffect(() => {
    console.log("Updated todolist");
  }, [todoListArray]);

  return (
    <Divider
      className="App"
      textAlign="center"
      orientation="vertical"
      variant="middle"
      sx={{ width: "100%" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          paddingTop: "2%",
          paddingLeft: "1%",
          width: "100%",
        }}
      >
        <TodoInput
          value={todo}
          handleChange={handleChangeTodo}
          handleKey={handleKeydownTodo}
        />
        <AddButton
          addButtonClick={handleAddButtonClick}
          disabled={todo.trim() === ""}
        />
      </div>

      <TasksList
        todoListArray={todoListArray}
        handleTaskSelection={handleTaskSelection}
      />

      <Divider
        textAlign="left"
        orientation="vertical"
        onClick={showCompletedTasks}
        sx={{
          "&:hover": { backgroundColor: "rgb(204, 210, 241)", cursor: 'pointer' },
          borderRadius: "15px",
          width: "80%",
        }}
      >
        <h3>Completed</h3>
      </Divider>

      <CompletedTasksList
        showCompleted={showCompleted}
        completedListArray={completedListArray}
        handleCompletedTaskDeletion={handleCompletedTaskDeletion}
      />
    </Divider>
  );
};

export default Todo;
