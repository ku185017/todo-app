import React, { useState } from "react";
import { TodoAdded } from "./todoAdded";
import {
  Button,
  TextField,
  Stack,
  InputAdornment,
  Paper,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import {
  addButtonStyle,
  appBarStyle,
  stackStyle,
  textFieldBgColor,
  textFieldStyle,
} from "./commonStyles";

export const TodoAdd = () => {
  const [inputFieldText, setInputFieldText] = useState("");
  const [isInputSubmitted, setIsInputSubmitted] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setInputFieldText(event.target.value);
  };

  const toggleIsInputSubmitted = () => {
    setIsInputSubmitted(!isInputSubmitted);
  };

  const clearInputTextField = () => {
    toggleIsInputSubmitted();
    setInputFieldText("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputFieldText.trim()) {
      toggleIsInputSubmitted();
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="regular">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={appBarStyle}
          >
            <ChecklistOutlinedIcon />
          </IconButton>
          <Typography
            title="todoBar"
            variant="h6"
            color="inherit"
            component="div"
          >
            To Do
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={stackStyle}>
          <Paper elevation={6}>
            <Stack>
              <TextField
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  disableUnderline: true,
                  style: textFieldBgColor,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="large"
                        variant="contained"
                        type="submit"
                        sx={addButtonStyle}
                        onClick={toggleIsInputSubmitted}
                        disabled={inputFieldText.trim() ? false : true}
                        startIcon={<AddIcon />}
                      >
                        Add
                      </Button>
                    </InputAdornment>
                  ),
                }}
                autoComplete="off"
                type="text"
                label="Add a text"
                value={inputFieldText}
                onChange={(event) => handleInputChange(event)}
              />
            </Stack>
          </Paper>
          <TodoAdded
            inputSubmitted={isInputSubmitted}
            clearTodoNote={clearInputTextField}
            todoNote={inputFieldText}
          />
        </Stack>
      </form>
    </>
  );
};
