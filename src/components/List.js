import React from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

const List = ({todoList, setTodoList, handleCompleteChange, removeList}) => {
    const HandleEnd = result => {
        console.log(result);

        if (!result.destination) return;

        // 1. 변경시키는 아이템을 배열에서 지워준다.
        // 2. return 값으로 지워진 아이템을 잡아준다.
        const newTodoData = todoList;
        const [reorderedItem] = newTodoData.splice(result.source.index, 1);

        console.log('res', reorderedItem);
        // 원하는 자리에 reoderItem을 insert 한다.
        newTodoData.splice(result.destination.index, 0, reorderedItem);
        console.log('newTodo', newTodoData);
        setTodoList(newTodoData);
    };

    return (
        <div className="h-[calc(100vh-250px)] w-full max-w-[500px] p-5 overflow-y-scroll">
            <DragDropContext onDragEnd={HandleEnd}>
                <Droppable droppableId="todo">
                    {provided => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {todoList.length > 0 ? (
                                todoList.map(({id, title, completed}, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                    className={`${
                                                        snapshot.isDragging ? 'bg-gray-400' : 'bg-gray-100'
                                                    } flex justify-center items-center pb-2`}
                                                >
                                                    <div className="w-full">
                                                        <input
                                                            type="checkbox"
                                                            defaultChecked={completed}
                                                            onChange={() => handleCompleteChange(id)}
                                                        />
                                                        <span className={completed === true ? '' : ''}>{title}</span>
                                                    </div>
                                                    <button className="" onClick={() => removeList(id)}>
                                                        x
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })
                            ) : (
                                <div className="flex justify-center items-center">"할 일을 추가해 주세요."</div>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default List;
