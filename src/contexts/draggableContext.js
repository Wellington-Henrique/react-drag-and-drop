import { createContext, useState } from 'react'

export const DraggableContext = createContext({});

export function DraggableProvider({children}) {
    const [draggables, setDraggables] = useState([]);
    const [dragOverId, setDragOverId] = useState(null);

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('text/plain', id);
    };
    
    const handleDragOver = (e, targetId) => {
      e.preventDefault();
      
      if (!targetId)
        return

      setDragOverId(targetId);
    };
    
    const handleDrop = (e, draggableContainerId, targetId) => {
        e.preventDefault();
        
        if (!targetId)
          return;

        const draggedId = e.dataTransfer.getData('text/plain');
        
        const dragged = draggables?.find(draggable => draggable.id === draggedId);

        const updatedDraggables = draggables?.filter(draggable => draggable.id !== draggedId);
        
        const targetIndex = draggables?.findIndex(draggable => draggable.id === targetId);
        
        const movedDraggeble = {...dragged, stepId: draggableContainerId}

        updatedDraggables?.splice(targetIndex, 0, movedDraggeble);

        setDraggables(updatedDraggables);
        setDragOverId(null);
    };

    return (
      <DraggableContext.Provider value={{ draggables, setDraggables, dragOverId, handleDragStart, handleDragOver, handleDrop}}>
        {children}
      </DraggableContext.Provider>
    )
}    