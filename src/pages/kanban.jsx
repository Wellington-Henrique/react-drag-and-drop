
import { useEffect } from "react";

import { useDraggable } from "../hooks/useDraggable";

import { v4 as uuidv4 } from 'uuid';

import PageTitle from "../components/PageTitle";
import { Draggable, DraggableTitle, DraggablesContainer, Input } from "../components/Draggable";

const ids = [uuidv4(), uuidv4(), uuidv4(), uuidv4()];

const mySteps = [
    { 
        id: ids[0],
        title: "Pendente", 
    }, 
    {
        id: ids[1],
        title: "Estudando", 
    }, 
    { 
        id: ids[2],
        title: "Revisando",
    }, 
    {   
        id: ids[3],
        title: "Fixado", 
    }
]

const testDraggables = [
    {id: uuidv4(), title: "Redux", stepId: ids[0]}, 
    {id: uuidv4(), title: "Contexto (useContext)", stepId: ids[0]}, 
    {id: uuidv4(), title: "Task 12", stepId: ids[0]},
    {id: uuidv4(), title: "CSS Avançado", stepId: ids[1]}, 
    {id: uuidv4(), title: "Referencia de componentes (useRef)", stepId: ids[2]}, 
    {id: uuidv4(), title: "Javascript - Métodos de array", stepId: ids[2]},
    {id: uuidv4(), title: "Javascript - Classe", stepId: ids[2]}, 
    {id: uuidv4(), title: "Vida do componente", stepId: 4}, 
    {id: uuidv4(), title: "HTML", stepId: ids[3]},
    {id: uuidv4(), title: "Task 30", stepId: ids[3]},
    {id: uuidv4(), title: "Estado dos componentes (useState)", stepId: ids[3]},
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
            )}
        </div>
      </>
    )
}

export default Kanban;
