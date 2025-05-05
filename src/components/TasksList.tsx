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
};

export const TasksList = (props: TasksListProp) => {
  return (
    <Divider textAlign="center" orientation="vertical">
      {props.todoListArray.map((task, index) => (
        <List key={index} sx={{ display: "flex" }}>
          <Paper
            elevation={5}
            sx={{ width: "80%", justifyContent: "space-between" }}
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
              </Box>
            </ListItem>
          </Paper>
        </List>
      ))}
    </Divider>
  );
};
