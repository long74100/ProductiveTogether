import React, { useState, useReducer } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Goal, ActionItemStatus, ActionItem } from '../models/Goal';
import { CreatableSingleSelect } from '../components';


const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    [result[startIndex], result[endIndex]] = [result[endIndex], result[startIndex]];
    return result;
};

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
    background: '#fff',

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
    updateActionItem: (actionItem: ActionItem) => any;
}

const Kanban = (props: Props) => {

    const { goal, canEdit } = props;
    const bucketItems = (type: number) => goal.actionItems.filter(ai => ai.status === type);

    const actionItemBuckets: { [id: string]: ActionItem[] } = {
        'Todo': bucketItems(ActionItemStatus.Todo),
        'In Progress': bucketItems(ActionItemStatus.InProgress),
        'Complete': bucketItems(ActionItemStatus.Complete),
        'Revisit': bucketItems(ActionItemStatus.Revisit)
    }

    const [actionItems, setActionItems] = useState(actionItemBuckets);

    function onDragEnd(result: any) {
        const { source, destination } = result;

        if (!destination) {
            return;
        }
        const sInd = source.droppableId;
        const dInd = destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(actionItems[sInd], source.index, destination.index);
            setActionItems({ ...actionItems, [sInd]: items });
        } else {
            const actionItemId = result.draggableId;
            const actionItem = goal.actionItems.find(ai => ai.id === actionItemId);
            const moveResult = move(actionItems[sInd], actionItems[dInd], source, destination);
            setActionItems({ ...actionItems, [sInd]: moveResult[sInd], [dInd]: moveResult[dInd] });
            if (actionItem) {
                props.updateActionItem({ ...actionItem, status: ActionItemStatus[dInd] });
            }
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
                    {Object.entries(actionItems).map(([column, ais]) => (
                        <div key={column + '-full'}>
                            <div className='d-flex justify-content-between'
                                style={{ padding: '1em 8px', background: 'rgb(235, 236, 240)', borderRadius: '5px 5px 0 0' }}>
                                <p className='mx-3'>{column}</p>
                                <FontAwesomeIcon className='mx-3' icon={faPlus} size='2x' color='lightgrey' />
                            </div>
                            <Droppable key={column} droppableId={`${column}`} isDropDisabled={!canEdit}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                        {...provided.droppableProps}
                                    >
                                        {ais.map((ai: ActionItem, index) => (
                                            <Draggable
                                                key={ai.id}
                                                draggableId={ai.id}
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
                                                            {ai.description}

                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}

                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
}

export default Kanban;