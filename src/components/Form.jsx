import { createSignal } from "solid-js"

export default function Form(props){
    
    const [form, setForm] = createSignal(props.initialTodo)
    
    const handleChange = (event) => {
        const newForm = {...form()}
        if (event.target.getAttribute("type") === "checkbox"){
            newForm[event.target.name] = event.target.checked
        } else {
            newForm[event.target.name] = event.target.value
        }
        console.log(form)
        setForm(newForm)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(props.action())
        if(props.action() === "create"){
            let f = form()
            let todo = {reminder: f.reminder, completed: f.completed}
            console.count()
            props.create(todo)
        }
        if (props.action() === "update"){
            console.count()
            props.update(form())
        }
    }



    return <form onSubmit={handleSubmit}>
        <input type="text" name="reminder" value={form().reminder} onInput={handleChange}/>
        <input type="checkbox" name="completed" checked={form().completed} onInput={handleChange}/>
        <input type="submit" value="submit"/>
    </form>
}