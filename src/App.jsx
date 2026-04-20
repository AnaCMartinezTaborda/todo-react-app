import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { arrayMove } from "@dnd-kit/sortable";

function App() {
  const [tarea, setTarea] = useState("");
  const [filtro, setFiltro] = useState("todas");
  const [darkMode, setDarkMode] = useState(() => {
    const modoGuardado = localStorage.getItem("darkMode");
    return modoGuardado === "true";
  });

  const [lista, setLista] = useState(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });

  // Guardar tareas
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(lista));
  }, [lista]);

  // Activar modo oscuro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  //Guardar modo oscuro en localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

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

  const tareasPendientes = lista.filter((t) => !t.completada).length;

  const moverTarea = (activeId, overId) => {
    setLista((items) => {
      const oldIndex = items.findIndex((t) => t.id === activeId);
      const newIndex = items.findIndex((t) => t.id === overId);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-4 text-center dark:text-white">
          📝 Lista de tareas
        </h1>

        <button
          className="mb-4 px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Modo claro" : "🌙 Modo oscuro"}
        </button>

        <TaskInput
          tarea={tarea}
          setTarea={setTarea}
          agregarTarea={agregarTarea}
        />

        <div className="flex justify-center gap-2 my-4">
          <button
            onClick={() => setFiltro("todas")}
            className={`px-3 py-1 rounded ${
              filtro === "todas"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 dark:bg-gray-700 dark:text-white"
            }`}
          >
            Todas
          </button>

          <button
            onClick={() => setFiltro("pendientes")}
            className={`px-3 py-1 rounded ${
              filtro === "pendientes"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 dark:bg-gray-700 dark:text-white"
            }`}
          >
            Pendientes
          </button>

          <button
            onClick={() => setFiltro("completadas")}
            className={`px-3 py-1 rounded ${
              filtro === "completadas"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 dark:bg-gray-700 dark:text-white"
            }`}
          >
            Completadas
          </button>
        </div>

        <TaskList
          lista={tareasFiltradas}
          toggleTarea={toggleTarea}
          eliminarTarea={eliminarTarea}
          moverTarea={moverTarea}
        />

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
          Tareas pendientes: {tareasPendientes}
        </p>
      </div>
    </div>
  );
}

export default App;
