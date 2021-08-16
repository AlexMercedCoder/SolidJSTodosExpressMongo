import { For } from "solid-js";

export default function Display(props) {
  console.log(props.todos());
  return (
    <For each={props.todos()} fallback={<h1>Loading...</h1>}>
      {(todo) => (
        <div key={todo._id}>
          <h3 onClick={() => props.select(todo)}>
            {todo.reminder} - {todo.completed ? "COMPLETED" : "X"}
          </h3>
          <button onClick={() => props.destroy(todo)}>Delete</button>
        </div>
      )}
    </For>
  );
}
