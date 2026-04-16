import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  const [tarea, setTarea] = useState("");
  const [filtro, setFiltro] = useState("todas");
  const [lista, setLista] = useState(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(lista));
  }, [lista]);

  const agregarTarea = () => {
    if (tarea.trim() === "") return;

    const nuevaTarea = {
      id: Date.now(),
      texto: tarea,
      completada: false,
    };

    setLista([...lista, nuevaTarea]);
    setTarea("");
  };

  const eliminarTarea = (id) => {
    const nuevaLista = lista.filter((t) => t.id !== id);
    setLista(nuevaLista);
  };

  const toggleTarea = (id) => {
    const nuevaLista = lista.map((t) =>
      t.id === id ? { ...t, completada: !t.completada } : t,
    );

    setLista(nuevaLista);
  };

  const tareasFiltradas = lista.filter((t) => {
    if (filtro === "pendientes") return !t.completada;
    if (filtro === "completadas") return t.completada;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-4 text-center">
          📝 Lista de tareas
        </h1>

        <TaskInput
          tarea={tarea}
          setTarea={setTarea}
          agregarTarea={agregarTarea}
        />

        <div className="flex justify-center gap-2 my-4">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={() => setFiltro("todas")}
          >
            Todas
          </button>

          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={() => setFiltro("pendientes")}
          >
            Pendientes
          </button>

          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={() => setFiltro("completadas")}
          >
            Completadas
          </button>
        </div>

        <TaskList
          lista={tareasFiltradas}
          toggleTarea={toggleTarea}
          eliminarTarea={eliminarTarea}
        />

        <p className="mt-4 text-sm text-gray-500">
          Total tareas: {lista.length}
        </p>
      </div>
    </div>
  );
}

export default App;
