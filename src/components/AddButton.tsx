import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
type AddButtonProps = {
  disabled: boolean;
  addButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const AddButton = (props: AddButtonProps) => {
  return (
    <Button
      type="submit"
      variant="contained"
      title="AddButton"
      onClick={props.addButtonClick}
      disabled={props.disabled}
      size="medium"
      sx={{ width: "6%" }}
      startIcon={<AddIcon />}
    >
      Add
    </Button>
  );
};
