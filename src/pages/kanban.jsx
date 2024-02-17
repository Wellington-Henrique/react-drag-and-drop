
import { useDraggable } from "../hooks/useDraggable";

import PageTitle from "../components/PageTitle";
import { Draggable, DraggableTitle, DraggablesContainer, Input } from "../components/Draggable";
import { useEffect } from "react";


const mySteps = [
    { 
        id: 1,
        title: "Pendente", 
    }, 
    {
        id: 2,
        title: "Estudando", 
    }, 
    { 
        id: 3,
        title: "Revisando",
    }, 
    {   
        id: 4,
        title: "Fixado", 
    }
]

const testDraggables = [
    {id: 1, title: "Redux", stepId: 1}, 
    {id: 2, title: "Contexto (useContext)", stepId: 1}, 
    {id: 3, title: "Estado dos componentes (useState)", stepId: 4},
    {id: 21, title: "Referencia de componentes (useRef)", stepId: 3}, 
    {id: 16, title: "CSS Avançado", stepId: 2}, 
    {id: 27, title: "Javascript - Métodos de array", stepId: 3},
    {id: 11, title: "Javascript - Classe", stepId: 3}, 
    {id: 18, title: "Vida do componente", stepId: 4}, 
    {id: 25, title: "HTML", stepId: 4},
    {id: 30, title: "Task 30", stepId: 4},
    {id: 12, title: "Task 12", stepId: 1}
]

function Kanban() {
    const { draggables, setDraggables } = useDraggable();

    useEffect(() => {
        setDraggables(testDraggables);
    }, [])

    return (
      <>
        <PageTitle text='Me plano de estudos'/>
        <div className="content">
            {mySteps.map(step => 
            <> 
                <DraggablesContainer
                    key={step.id}
                    draggableContainerId={step.id}
                >
                    <DraggableTitle title={step.title} onClick={() => console.log("clicou...")}/>

                    {!!draggables.filter(item => item.stepId === step.id)?.length ?
                        draggables
                        .filter(draggable => draggable.stepId === step.id)
                        .map(item => 
                            <Draggable 
                                key={item.id}
                                draggableContainerId={step.id}
                                draggable={item}
                            >{item.title}</Draggable>
                        ) : <span>Adicione um novo tema...</span>}
                    <Input draggableContainerId={step.id}/>
                </DraggablesContainer>
            </>)}
        </div>
      </>
    )
}

export default Kanban;
