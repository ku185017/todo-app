import { Button, Paper, TextareaAutosize, Zoom } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import { todoEditPropType } from "./types";
import { buttonBoxStyle, editFieldStyle } from "./commonStyles";

export const TodoEdit = ({
  edit,
  remove,
  close,
  opened,
  todoItem,
}: todoEditPropType) => {
  const [text, setText] = useState(todoItem.note);

  // this is only used when edit thing is open and user clicks on an another edit button then the text should update
  useEffect(() => {
    setText(todoItem.note);
  }, [todoItem]);

  return (
    <>
      <Zoom in={opened}>
        <Box
          zIndex={3}
          position="fixed"
          top="20%"
          left="30%"
          width="40%"
          height="57%"
          bgcolor="#F8F8F8"
          component={Paper}
          elevation={20}
        >
          <Stack spacing={2} m={3} overflow="scroll">
            <Box alignSelf="flex-end">
              <Button
                title="close"
                size="small"
                variant="contained"
                color="error"
                onClick={close}
              >
                <CloseOutlinedIcon />
              </Button>
            </Box>
            <TextareaAutosize
              title="editField"
              onChange={(event) => setText(event.target.value)}
              value={text}
              minRows={18}
              maxRows={18}
              style={editFieldStyle}
            />
            <Box sx={buttonBoxStyle}>
              <Button
                title="delete-onEdit"
                onClick={() => {
                  remove(todoItem.id);
                  close();
                }}
                color="error"
                variant="contained"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              <Button
                color="info"
                onClick={() => {
                  edit(todoItem.id, text);
                  close();
                }}
                variant="contained"
                startIcon={<SaveAsOutlinedIcon />}
              >
                Save
              </Button>
            </Box>
          </Stack>
        </Box>
      </Zoom>
    </>
  );
};
