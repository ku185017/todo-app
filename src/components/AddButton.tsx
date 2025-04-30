import Button from '@mui/material/Button';
type AddButtonProps = {
    disabled: boolean
    addButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

//<button onClick = {props.addButtonClick} disabled = {props.disabled}>Add</button>

export const AddButton = (props: AddButtonProps) => {
    return(
        
        
        <Button variant="outlined" onClick = {props.addButtonClick} disabled = {props.disabled} size='small' sx={{display:'flex'}}>Add</Button>
        
    )
}