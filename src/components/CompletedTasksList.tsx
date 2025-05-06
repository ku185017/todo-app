import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Box, Paper } from "@mui/material";
import { listItemCompletedStyle } from "./commonStyles";

type CompletedTasksListProps = {
  showCompleted: boolean;
  completedListArray: String[];
  handleCompletedTaskDeletion: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export const CompletedTasksList = (props: CompletedTasksListProps) => {
  return (
    <Box sx={{ maxLines: 400 }}>
      <Divider
        textAlign="center"
        orientation="vertical"
        style={{ maxHeight: 300, overflow: "auto" }}
      >
        {props.showCompleted &&
          props.completedListArray.map((task, index) => (
            <List
              key={index}
              sx={{ display: "flex", paddingTop: "0px", paddingBottom: "1px" }}
            >
              <Paper elevation={5} sx={{ width: "95%" }}>
                <ListItem divider={true} sx={listItemCompletedStyle}>
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
    </Box>
  );
};
