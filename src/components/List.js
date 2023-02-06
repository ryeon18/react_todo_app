import React, {useState} from 'react';

const List = React.memo(({id, title, completed, provided, snapshot, removeList, handleCompleteChange}) => {
  return (
    <div
      {...provided.draggableProps}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      className={`${snapshot.isDragging ? 'bg-gray-400' : 'bg-gray-100'} flex justify-center items-center pb-2 mb-3`}
    >
      <div className="w-full">
        <input type="checkbox" defaultChecked={completed} onChange={() => handleCompleteChange(id)} />
        <span className={completed === true ? 'line-through' : ''}>{title}</span>
      </div>
      {/* <button className="p-3" onClick={() => handleEditTitle(title)}>
                edit
            </button> */}
      <button className="p-3" onClick={() => removeList(id)}>
        x
      </button>
    </div>
  );
});

export default List;
