import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";




type InputProps = {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  
  handleSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  
};



export const TodoInput = (props: InputProps) => {
  return (
    <Stack spacing={2} sx={{ width: "80%" }}>
      <form onSubmit={props.handleSubmit}>
        <TextField
          value={props.value}
          onChange={props.handleChange}
          size="medium"
          sx={{ width: "98%", display: "flex" }}
          placeholder="Enter task"
          
        ></TextField>
        <input type="submit" hidden />
      </form>
    </Stack>
  );
};
