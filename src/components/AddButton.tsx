import Button from "@mui/material/Button";
type AddButtonProps = {
  disabled: boolean;
  addButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};



export const AddButton = (props: AddButtonProps) => {
  return (
    <Button
     type = "submit"
      variant="outlined"
      title="AddButton"
      onClick={props.addButtonClick}
      disabled={props.disabled}
      size="small"
      sx={{ display: "flex" }}
    >
      Add
    </Button>
  );
};
