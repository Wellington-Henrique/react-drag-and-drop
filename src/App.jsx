import { DraggableProvider } from "./contexts/draggableContext";

import Kanban from "./pages/kanban";

import './App.css';

function App() {
    return (
      <DraggableProvider>
        <Kanban/>
      </DraggableProvider>
    )
}

export default App;
