import { render, screen } from "@testing-library/react"
import { TodoInput } from "./TodoInput";



test('Text Area renders properly', () => {
    
    render(<TodoInput value = 'hello there' handleChange = {() => {console.log('changed')}} handleKey={() => {console.log('key pressed')}} />)
    const textElement = screen.getByPlaceholderText('Enter task')
    expect(textElement).toHaveValue('hello there')

})
