import { useEffect, useState } from "react";
import {
  Radio,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { todoAddedPropType, todoItemType, todoNoteType } from "./types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { TodoCompleted } from "./todoCompleted";
import EditIcon from "@mui/icons-material/Edit";
import { TodoEdit } from "./todoEdit";
import {
  deleteButtonTableStyle,
  editButtonStyle,
  radioCellStyle,
  tableButtonsCellWidth,
  tableContainerStyle,
  todoNoteCellStyle,
} from "./commonStyles";

export const TodoAdded = ({
  inputSubmitted,
  clearTodoNote,
  todoNote,
}: todoAddedPropType) => {
  const [todoItemList, setTodoItemList] = useState<string[]>([]);
  const [completedTodoItem, setCompletedTodoItem] = useState<todoNoteType>(
    {} as todoNoteType,
  );
  const [shouldOpenTheTodoNote, setShouldOpenTheTodoNote] = useState(false);
  const [toBeEditableTodoItem, setToBeEditableTodoItem] =
    useState<todoItemType>({} as todoItemType);

  useEffect(() => {
    if (inputSubmitted) {
      setTodoItemList([todoNote.trim(), ...todoItemList]);
      clearTodoNote();
    }
  }, [inputSubmitted]);

  const editTodoNote = (position: number, note: string) => {
    const updatedList = todoItemList.map((item, index) => {
      if (position === index) {
        return note.trim();
      } else {
        return item;
      }
    });
    setTodoItemList(updatedList);
  };

  const toggleShouldOpenTheTodoNote = () => {
    setShouldOpenTheTodoNote(!shouldOpenTheTodoNote);
  };

  const removeTodoItemFromListByIndex = (position: number) => {
    if (toBeEditableTodoItem.id === position && shouldOpenTheTodoNote) {
      toggleShouldOpenTheTodoNote();
    }
    setTodoItemList(
      todoItemList.filter((todoItem, index) => index !== position),
    );
  };

  const markTodoItemAsCompleted = (todoItem: string, index: number) => {
    removeTodoItemFromListByIndex(index);
    setCompletedTodoItem({ note: todoItem });
  };

  const addTodoItemToTheList = (todoItem: string) => {
    setTodoItemList([todoItem, ...todoItemList]);
  };

  return (
    <>
      {todoItemList.length > 0 && (
        <TableContainer
          elevation={6}
          component={Paper}
          sx={tableContainerStyle}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Title</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todoItemList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell
                    onClick={() => markTodoItemAsCompleted(item, index)}
                    sx={radioCellStyle}
                  >
                    <Radio
                      checked={false}
                      icon={<CheckCircleOutlineIcon />}
                      value={`radioButton-${index}`}
                    />
                  </TableCell>
                  <TableCell title={`todoItem-${index}`} sx={todoNoteCellStyle}>
                    {item}
                  </TableCell>
                  <TableCell sx={tableButtonsCellWidth}>
                    <Button
                      sx={editButtonStyle}
                      title={`editButton-${index}`}
                      onClick={() => {
                        if (!shouldOpenTheTodoNote) {
                          toggleShouldOpenTheTodoNote();
                        }
                        setToBeEditableTodoItem({ id: index, note: item });
                      }}
                      variant="outlined"
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell sx={tableButtonsCellWidth}>
                    <Button
                      title={`deleteButton-${index}`}
                      onClick={() => removeTodoItemFromListByIndex(index)}
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
        </TableContainer>
      )}
      {shouldOpenTheTodoNote && (
        <TodoEdit
          edit={editTodoNote}
          remove={removeTodoItemFromListByIndex}
          todoItem={toBeEditableTodoItem}
          close={toggleShouldOpenTheTodoNote}
          opened={shouldOpenTheTodoNote}
        />
      )}
      <TodoCompleted
        completedTodoItem={completedTodoItem}
        addBackToTheTodoItemList={addTodoItemToTheList}
      />
    </>
  );
};
