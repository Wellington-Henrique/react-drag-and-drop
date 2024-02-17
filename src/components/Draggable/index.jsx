import { useState } from "react";
import { useDraggable } from "../../hooks/useDraggable";

import { v4 as uuidv4 } from 'uuid';

import './styles.css';

export function DraggablesContainer({draggableContainerId, children}) {
    const { handleDragOver, handleDrop } = useDraggable();

    return (
        <div     
            className='draggable-container' 
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, draggableContainerId)} 
        >
            {children}
        </div>
    )
}

export function Draggable({draggableContainerId, draggable, children}) {
    const { handleDragStart, handleDragOver, handleDrop, dragOverId } = useDraggable();

    return (
        <div 
            className={`card ${!!dragOverId && draggable.id === dragOverId ? 'drag-over' : ''}`}
            key={draggable.id}
            onDragStart={e => handleDragStart(e, draggable.id)}
            onDragOver={e => handleDragOver(e, draggable.id)}
            onDrop={e => handleDrop(e, draggableContainerId, draggable.id)}
            draggable
        >
            {children}
        </div>
    )
}

export function DraggableTitle({title, onClick}) {
    return (
        <div className="title-container">
            {title}
            {onClick && MenuIcon}
        </div>
    )
}

export function Button({title="Adicionar", onClick}) {
    return (
        <button 
            className='button' 
            onClick={onClick}
        >
            {AddIcon}
            <span>
                {title}
            </span>
        </button>
    )
}

export function Input({draggableContainerId, placeholder="Novo conteúdo...", onSave}) {
    const { draggables, setDraggables } = useDraggable();
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setValue(value)
    }

    const handleKeyDown = (e) => {
        const { keyCode } = e;

        if (keyCode === 13) {
            save(value);
            setValue('');
        }
    }
  
    const save = (data) => {
        const newItem = {id: uuidv4(), title: data, stepId: draggableContainerId}
        
        setDraggables([...draggables, newItem]);
    }

    return (
        <input 
            className='input'
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    )
}

const MenuIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
)

const AddIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
)