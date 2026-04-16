import TaskItem from "./TaskItem";

function TaskList({ lista, toggleTarea, eliminarTarea }) {
  return (
    <ul>
      {lista.map((tarea) => (
        <TaskItem
          key={tarea.id}
          tarea={tarea}
          toggleTarea={toggleTarea}
          eliminarTarea={eliminarTarea}
        />
      ))}
    </ul>
  );
}

export default TaskList;    