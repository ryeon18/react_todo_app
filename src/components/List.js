import React from 'react';

const List = ({todoList, handleCompleteChange, removeList}) => {
    return (
        <div className="h-[calc(100vh-250px)] w-full max-w-[500px] p-5 overflow-y-scroll">
            {todoList.length > 0 ? (
                todoList.map(({id, title, completed}) => {
                    return (
                        <div key={id} className="flex justify-center items-center pb-2">
                            <div className="w-full ">
                                <input
                                    type="checkbox"
                                    defaultchecked={completed}
                                    onChange={() => handleCompleteChange(id)}
                                />
                                <span className={completed === true ? '' : ''}>{title}</span>
                            </div>
                            <button className="" onClick={() => removeList(id)}>
                                x
                            </button>
                        </div>
                    );
                })
            ) : (
                <div className="flex justify-center items-center">"할 일을 추가해 주세요."</div>
            )}
        </div>
    );
};

export default List;
