function TaskInput({ tarea, setTarea, agregarTarea }) {

  const manejarTecla = (e) => {
    if (e.key === "Enter") {
      agregarTarea();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        className="border p-2 rounded w-full"
        type="text"
        placeholder="Escribe una tarea"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        onKeyDown={manejarTecla}
      />

      <button
        className="bg-blue-500 text-white px-4 rounded"
        onClick={agregarTarea}
      >
        Agregar
      </button>
    </div>
  );
}

export default TaskInput;