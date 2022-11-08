import React from 'react';

const Form = ({handleSubmit, addTitle, handleTitle}) => {
    return (
        <form className="flex h-fit w-full p-2 " onSubmit={e => handleSubmit(e)}>
            <input
                type="text"
                name="value"
                placeholder="해야 할 일을 입력하세요."
                value={addTitle}
                className="min-w-fit max-w-[400px] w-full p-2 border-2 border-red-300 rounded text-red-400 placeholder:text-red-200 focus:outline-none focus:border-red-400 focus:shadow-lg"
                onChange={e => handleTitle(e)}
            />
            <input
                type="submit"
                value="입력"
                className="ml-5 p-2 rounded-full bg-red-300 text-white hover:bg-red-400 hover:cursor-pointer"
            />
        </form>
    );
};

export default Form;
