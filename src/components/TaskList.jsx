import TaskItem from "./TaskItem";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function TaskList({ lista, toggleTarea, eliminarTarea, moverTarea }) {

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      moverTarea(active.id, over.id);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={lista.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="mt-4">
          {lista.map((tarea) => (
            <TaskItem
              key={tarea.id}
              tarea={tarea}
              toggleTarea={toggleTarea}
              eliminarTarea={eliminarTarea}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export default TaskList;