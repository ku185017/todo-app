import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Box, Button, Paper, TextField } from "@mui/material";
import { listItemStyle } from "./commonStyles";

type TasksListProp = {
  todoListArray: String[];
  isEditable: number;
  value: String;
  handleTaskSelection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnter: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  handleDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const TasksList = (props: TasksListProp) => {
  return (
    <Box sx={{ maxLines: 400 }}>
      <Divider
        textAlign="center"
        orientation="vertical"
        style={{ maxHeight: 300, overflow: "auto" }}
      >
        {props.todoListArray.map((task, index) => (
          <List
            key={index}
            sx={{ display: "flex", paddingTop: "0px", paddingBottom: "1px" }}
          >
            <Paper
              elevation={5}
              sx={{ width: "92%", justifyContent: "space-between" }}
            >
              <ListItem divider={true} value={index} sx={listItemStyle}>
                <Checkbox
                  value={index}
                  checked={false}
                  onChange={(e) => props.handleTaskSelection(e)}
                />
                {props.isEditable === index && (
                  <form onSubmit={props.handleEnter}>
                    <TextField
                      onChange={props.handleChange}
                      value={props.value}
                      title="EditTextField"
                      size="small"
                      inputProps={{ "data-testid": task.toString() }}
                    ></TextField>
                  </form>
                )}

                {props.isEditable !== index && task}
                <Box sx={{ alignSelf: "end", verticalAlign: "right" }}>
                  <Button
                    title={task.toString()}
                    onClick={props.handleEditClick}
                    value={index}
                  >
                    Edit
                  </Button>
                  <Button title={task.toString().concat(" delete")}
                  onClick = {props.handleDelete}
                  value={index}>
                    Delete
                  </Button>
                </Box>
              </ListItem>
            </Paper>
          </List>
        ))}
      </Divider>
    </Box>
  );
};
