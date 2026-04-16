function TaskInput({ tarea, setTarea, agregarTarea }) {

  const manejarTecla = (e) => {
    if (e.key === "Enter") {
      agregarTarea();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Escribe una tarea"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        onKeyDown={manejarTecla}
      />

      <button onClick={agregarTarea}>
        Agregar
      </button>
    </div>
  );
}

export default TaskInput;