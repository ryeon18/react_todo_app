import React from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import List from './List';

const Lists = React.memo(({todoList, setTodoList, removeList, handleCompleteChange}) => {
    console.log('lists render');
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
        <div className="max-h-[250px] w-full max-w-[500px] p-5 overflow-y-scroll">
            <DragDropContext onDragEnd={HandleEnd}>
                <Droppable droppableId="todo">
                    {provided => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {todoList.length > 0 ? (
                                todoList.map(({id, title, completed}, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <List
                                                    id={id}
                                                    title={title}
                                                    completed={completed}
                                                    provided={provided}
                                                    snapshot={snapshot}
                                                    removeList={removeList}
                                                    handleCompleteChange={handleCompleteChange}
                                                />
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
});

export default Lists;
