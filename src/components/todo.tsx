import { useEffect, useState } from "react";
import { TodoInput } from "./TodoInput";
import { AddButton } from "./AddButton";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { Paper } from "@mui/material";

type Task = {
  id: number;
  task: string | undefined;
};

const Todo = () => {
  const [todo, setTodo] = useState("");

  const [todoList, setTodoList] = useState<Task[]>([]);
  const [completedList, setCompletedList] = useState<Task[]>([]);
  const [numTask, setNumTask] = useState(0);
  const [numCompletedTask, setNumCompletedTask] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedEntryId, setSelectedEntryId] = useState(0);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleChangeTodo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.trim()) {
      setTodo(event.target.value);
      setIsDisabled(false);
      console.log("value is:", event.target.value);
    } else {
      setTodo(event.target.value);
      console.log("value is: ", event.target.value);
      setIsDisabled(true);
    }
  };

  const handleKeydownTodo = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setNumTask(numTask + 1);
      setTodoList([...todoList, { id: numTask, task: todo.trim() }]);
      setTodo("");
      setIsDisabled(true);
    }
  };

  const handleAddButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //add todo to the list of todos.
    setNumTask(numTask + 1);
    setTodoList([...todoList, { id: numTask, task: todo.trim() }]);
    setTodo("");
    setIsDisabled(true);
  };

  const handleTaskSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const taskID = parseInt(event.target.value);
    console.log(event.target);
    if (event.target.checked) {
      setSelectedEntryId(taskID);

      const currentTask = todoList.find((item) => item.id === taskID);

      console.log("task to be removed is ", currentTask);

      const anotherList = todoList.filter((t) => t.id !== taskID);
      setTodoList(anotherList);
      console.log("todo list: ", todoList);
      setNumCompletedTask(numCompletedTask + 1);
      //setNumCompletedTask(selectedEntryId)
      setCompletedList([
        ...completedList,
        { id: numCompletedTask, task: currentTask?.task },
      ]);
      console.log(completedList);
      setSelectedEntryId(-1);
    }
  };

  const handleCompletedTaskDeletion = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const completedtaskID = parseInt(event.target.value);
    if (event.target.checked) {
      const anotherList = completedList.filter((t) => t.id !== completedtaskID);
      setCompletedList(anotherList);
    }
  };

  const showCompletedTasks = (event: React.MouseEvent<HTMLElement>) => {
    setShowCompleted(!showCompleted);
  };

  useEffect(() => {
    if (selectedEntryId !== -1) {
      console.log("todo updated");
    }
  }, [todoList, selectedEntryId]);

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
          disabled={isDisabled}
        />
      </div>

      <Divider textAlign="center" orientation="vertical">
        {todoList.map((task) => (
          <List key={task.id}>
            <ListItem
              divider={true}
              component={Paper}
              sx={{
                width: "80%",
                "&:hover": { backgroundColor: "rgb(203, 222, 246)" },
                backgroundColor: "background.paper",
                border: "0.7px groove",
                borderRadius: "15px",
              }}
            >
              <Checkbox
                value={task.id}
                onChange={(e) => handleTaskSelection(e)}
              />
              {task.task}
            </ListItem>
          </List>
        ))}
      </Divider>

      <Divider
        textAlign="left"
        orientation="vertical"
        onClick={showCompletedTasks}
        sx={{
          "&:hover": { backgroundColor: "rgb(204, 210, 241)" },
          borderRadius: "15px",
          width: "80%",
        }}
      >
        <h3>Completed</h3>
      </Divider>

      <Divider textAlign="center" orientation="vertical">
        {showCompleted &&
          completedList.map((task) => (
            <List key={task.id}>
              <ListItem
                component={Paper}
                divider={true}
                sx={{
                  width: "80%",
                  "&:hover": { backgroundColor: "rgb(203, 222, 246)" },
                  backgroundColor: "background.paper",
                  border: "0.7px groove",
                  borderRadius: "15px",
                }}
              >
                <Checkbox
                  value={task.id}
                  onChange={(e) => handleCompletedTaskDeletion(e)}
                ></Checkbox>
                <del>{task.task}</del>
              </ListItem>
            </List>
          ))}
      </Divider>
    </Divider>
  );
};

export default Todo;
