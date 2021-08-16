import Display from "./components/Display";
import Form from "./components/Form";
import { createSignal, createEffect, onMount, Show } from "solid-js";

function App() {
  const url = "http://localhost:10000/todos";
  const emptyTodo = {
    reminder: "",
    completed: false,
    _id: "",
  };

  const [todos, setTodos] = createSignal([]);
  const [showForm, setShowForm] = createSignal(false);
  const [formTodo, setFormTodo] = createSignal(emptyTodo);
  const [action, setAction] = createSignal("create")

  const resetState = () => {
    setShowForm(false)
    setFormTodo(emptyTodo)
    setAction("create")
  }

  const getTodos = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setTodos(data);
  };

  const createTodos = async (todo) => {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    })

    getTodos()
    resetState()
  }

  const updateTodos = async (todo) => {
    await fetch(url + `/${todo._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    })

    getTodos()
    resetState()
  }

  const deleteTodos = async (todo) => {
    await fetch(url + `/${todo._id}`, {
      method: "delete",
    })

    getTodos()
    resetState()
  }

  const toggleTodo = () => {
    setShowForm(!showForm());
  };

  const selectTodoToUpdate = (todo) => {
    setFormTodo(todo)
    setAction("update")
    toggleTodo()
  } 

  onMount(() => {
    getTodos();
  });

  return (
    <div>
      <h1>Alex's Todos</h1>
      <button onClick={toggleTodo}>Create a Todo</button>
      <Display todos={todos} select={selectTodoToUpdate} destroy={deleteTodos}/>

      <Show when={showForm()}>
        <Form initialTodo={formTodo()} action={action} create={createTodos} update={updateTodos}/>
      </Show>
    </div>
  );
}

export default App;
