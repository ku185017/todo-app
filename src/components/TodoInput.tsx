import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

type InputProps = {
    value: string
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleKey: (event: React.KeyboardEvent<HTMLDivElement>) => void
}

//handleKey: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void
//<textarea  cols={100} rows={3} value = {props.value} onChange = {props.handleChange} onKeyDown={props.handleKey} style={{borderColor: 'rgb(159, 193, 234)', borderRadius: '5px', resize: 'none'}} placeholder="enter task" />

export const TodoInput = (props: InputProps) => {
    
    return (
        <Stack spacing={2} sx={{width:'80%'}}>
        <form>
        <TextField value = {props.value} onChange = {props.handleChange} onKeyDown={props.handleKey} size='medium' sx={{width:'98%', display: 'flex'}} placeholder='Enter task'></TextField>
        </form>
        
        </Stack>
    )
}