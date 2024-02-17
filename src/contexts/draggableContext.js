import { createContext, useState } from 'react'

export const DraggableContext = createContext({});

export function DraggableProvider({children}) {
    const [draggables, setDraggables] = useState([]);

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('text/plain', id);
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    
    const handleDrop = (e, draggableContainerId, targetId) => {
        e.preventDefault();
        
        if (!targetId)
          return;
        
        const draggedId = e.dataTransfer.getData('text/plain');
        
        const dragged = draggables?.find(drag => drag.id.toString() === draggedId.toString());

        const updatedDraggables = draggables?.filter(draggable => draggable.id.toString() !== draggedId.toString());
        
        const targetIndex = draggables?.findIndex(draggable => draggable.id === targetId);
        
        const movedDraggeble = {...dragged, stepId: draggableContainerId}
        
        updatedDraggables?.splice(targetIndex === -1 ? 0 : targetIndex, 0, movedDraggeble);

        setDraggables(updatedDraggables);
    };

    return (
      <DraggableContext.Provider value={{ draggables, setDraggables, handleDragStart, handleDragOver, handleDrop}}>
        {children}
      </DraggableContext.Provider>
    )
}    