import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Paper } from "@mui/material";

type CompletedTasksListProps = {
    showCompleted: boolean,
    completedListArray: String[],
    handleCompletedTaskDeletion: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CompletedTasksList = (props: CompletedTasksListProps) => {
    return (
        <Divider textAlign="center" orientation="vertical">
        {props.showCompleted &&
          props.completedListArray.map((task, index) => (
            <List key={index}>
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
                  value={index}
                  checked={false}
                  onChange={(e) => props.handleCompletedTaskDeletion(e)}
                ></Checkbox>
                <del>{task}</del>
              </ListItem>
            </List>
          ))}
      </Divider>
    )
}