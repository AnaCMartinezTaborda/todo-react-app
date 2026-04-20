import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TaskItem({ tarea, toggleTarea, eliminarTarea }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: tarea.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex justify-between items-center border-b py-2"
    >
      {/* Zona para arrastrar */}
      <span
        {...attributes}
        {...listeners}
        className="cursor-grab mr-2 text-gray-400"
      >
        ☰
      </span>

      {/* Texto de la tarea */}
      <span
        className={`flex-1 cursor-pointer ${
          tarea.completada ? "line-through text-gray-400" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          toggleTarea(tarea.id);
        }}
      >
        {tarea.texto}
      </span>

      {/* Botón eliminar */}
      <button
        className="text-red-500 hover:text-red-700 ml-2"
        onClick={(e) => {
          e.stopPropagation();
          eliminarTarea(tarea.id);
        }}
      >
        Eliminar
      </button>
    </motion.li>
  );
}

export default TaskItem;
