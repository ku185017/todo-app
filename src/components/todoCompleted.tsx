import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { todoCompletedPropType } from "./types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import {
  accordionDetailsStyle,
  accordionStyle,
  accordionSummaryStyle,
  avatarStyle,
  checkboxCellStyle,
  deleteButtonTableStyle,
  tableButtonsCellWidth,
  todoNoteCompletedCellStyle,
} from "./commonStyles";

export const TodoCompleted = ({
  completedTodoItem,
  addBackToTheTodoItemList,
}: todoCompletedPropType) => {
  const [completedTodoItemList, setCompletedTodoItemList] = useState<string[]>(
    [],
  );

  useEffect(() => {
    if (completedTodoItem.note) {
      setCompletedTodoItemList([
        completedTodoItem.note,
        ...completedTodoItemList,
      ]);
    }
  }, [completedTodoItem]);

  const removeCompletedTodoItemFromListByIndex = (position: number) => {
    setCompletedTodoItemList(
      completedTodoItemList.filter((item, index) => index !== position),
    );
  };

  const markTodoItemAsInComplete = (todoItem: string, position: number) => {
    removeCompletedTodoItemFromListByIndex(position);
    addBackToTheTodoItemList(todoItem);
  };
  return (
    <>
      {completedTodoItemList.length > 0 && (
        <Accordion elevation={6} component={Paper} sx={accordionStyle}>
          <AccordionSummary
            sx={accordionSummaryStyle}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="subtitle1">
              Completed{" "}
              <Avatar sx={avatarStyle}>
                {completedTodoItemList.length > 9
                  ? "9+"
                  : completedTodoItemList.length}
              </Avatar>
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={accordionDetailsStyle}>
            <Table>
              <TableBody>
                {completedTodoItemList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell
                      onClick={() => markTodoItemAsInComplete(item, index)}
                      sx={checkboxCellStyle}
                    >
                      <Checkbox
                        checkedIcon={<CheckCircleIcon />}
                        value={`checkBox-${index}`}
                        size="medium"
                        checked={true}
                      />
                    </TableCell>
                    <TableCell
                      title={`completedTodoItem-${index}`}
                      sx={todoNoteCompletedCellStyle}
                    >
                      <del>{item}</del>
                    </TableCell>
                    <TableCell sx={tableButtonsCellWidth}>
                      <Button
                        title={`deleteCompletedButton-${index}`}
                        onClick={() =>
                          removeCompletedTodoItemFromListByIndex(index)
                        }
                        variant="outlined"
                        sx={deleteButtonTableStyle}
                        color="error"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};
