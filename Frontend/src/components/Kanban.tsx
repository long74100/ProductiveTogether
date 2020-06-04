import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { Goal, ActionItem } from '../models/Goal';
import { CreatableSingleSelect } from '../components';

// fake data generator
const getItems = (count: number, offset = 0, colName: string) => {
    const tasks = Array.from({ length: 1 }, (v, k) => k).map(k => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: <div>`item ${k + offset}`</div>
    }));

    return tasks;
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source: any[], destination: any[], droppableSource: any, droppableDestination: any) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 1em ${grid}px 1em`,
    borderRadius: '2.5px',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '#fff',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : '#ebecf0',
    padding: grid,
});

type Props = {
    goal: Goal,
    canEdit: boolean;
}

const Kanban = (props: Props) => {

    const { goal, canEdit } = props;
    const columns = {
        'Todo': getItems(10, 0, 'Todo'),
        'In Progress': getItems(5, 10, 'In Progress'),
        'Complete': getItems(11, 20, 'Complete'),
        'Revisit': getItems(30, 40, 'Revisit')
    };

    const [tasks, setTasks] = useState([getItems(10, 0, 'Todo'), getItems(5, 10, 'In Progress'), getItems(11, 20, 'Complete'), getItems(30, 40, 'Revisit')]);

    function onDragEnd(result: any) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(tasks[sInd], source.index, destination.index);
            const newState = [...tasks];
            newState[sInd] = items;
            setTasks(newState);
        } else {
            const result = move(tasks[sInd], tasks[dInd], source, destination);
            const newState = [...tasks];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setTasks(newState.filter(group => group.length));
        }
    }

    const backgroundOptions = [
        { value: 'https://i.pinimg.com/originals/7b/dd/66/7bdd6647425b1e0481a43895577dcecb.jpg', label: 'Chocolate' },
        { value: 'https://wallpaperaccess.com/full/1098615.jpg', label: 'Boston' }
    ]


    const changeBackground = (url: string) => {
        const modal = document.querySelector('.ReactModal__Content') as HTMLElement;
        if (modal) {
            modal.style.background = `url(${url}) no-repeat center center`;
            modal.style.backgroundSize = 'cover';
        }
    }

    console.log(columns);


    return (
        <div>
            <div className='kanban-headers d-flex justify-content-between'>
                <h1>hello</h1>
                <div className='select-background w-25'>
                    <CreatableSingleSelect options={backgroundOptions} handleChange={changeBackground} />
                </div>
            </div>

            <div className='kanban mt-3'>
                <DragDropContext onDragEnd={onDragEnd}>
                    {Object.entries(columns).map(([column, tasks]) => (
                        <Droppable key={column} droppableId={`${column}`} isDropDisabled={!canEdit}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                >
                                    <div className='d-flex justify-content-between' style={{ margin: '0px 1em 8px' }}>
                                        <p>hello</p>
                                        <FontAwesomeIcon icon={faPlus} size='2x' color='lightgrey' />
                                    </div>
                                    {tasks.map((task, index) => (
                                        <Draggable
                                            key={task.id}
                                            draggableId={task.id}
                                            index={index}
                                            isDragDisabled={!canEdit}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <div className='d-flex'>
                                                        {task.content}

                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}

                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
}

export default Kanban;