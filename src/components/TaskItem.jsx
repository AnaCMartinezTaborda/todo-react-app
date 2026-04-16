function TaskItem({ tarea, toggleTarea, eliminarTarea }) {
  return (
    <li
      className="flex justify-between items-center border-b py-2"
      style={{
        textDecoration: tarea.completada ? "line-through" : "none",
      }}
    >
      <span
        className={`cursor-pointer ${
          tarea.completada ? "line-through text-gray-400" : ""
        }`}
        onClick={() => toggleTarea(tarea.id)}
      >
        {tarea.texto}
      </span>

      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => eliminarTarea(tarea.id)}
      >
        Eliminar
      </button>
    </li>
  );
}

export default TaskItem;
