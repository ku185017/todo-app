import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Paper } from "@mui/material";
import { listItemCompletedStyle } from "./commonStyles";

type CompletedTasksListProps = {
  showCompleted: boolean;
  completedListArray: String[];
  handleCompletedTaskDeletion: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
};

export const CompletedTasksList = (props: CompletedTasksListProps) => {
  return (
    <Divider textAlign="center" orientation="vertical">
      {props.showCompleted &&
        props.completedListArray.map((task, index) => (
          <List key={index}>
            <Paper elevation={5} sx={{width:'80%'}}>
            <ListItem
              
              divider={true}
              sx={listItemCompletedStyle}
            >
              <Checkbox
                value={index}
                checked={false}
                onChange={(e) => props.handleCompletedTaskDeletion(e)}
              ></Checkbox>
              <del>{task}</del>
            </ListItem>
            </Paper>
          </List>
        ))}
    </Divider>
  );
};
