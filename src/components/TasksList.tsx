import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { Paper } from "@mui/material";

type TasksListProp = {
    todoListArray: String[],
    handleTaskSelection: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const TasksList = (props: TasksListProp) => {
    return(
        <Divider textAlign="center" orientation="vertical">
        {props.todoListArray.map((task, index) => (
          <List key={index}>
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
                value={index}
                checked={false}
                onChange={(e) => props.handleTaskSelection(e)}
              />
              {task}
            </ListItem>
          </List>
        ))}
      </Divider>
    );
}




