import { useContext } from "react";

import { DraggableContext } from "../contexts/draggableContext";

export function useDraggable() {
    return useContext(DraggableContext);
}