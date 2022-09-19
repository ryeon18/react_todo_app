import React, {Component} from 'react';
import './App.css';

export default class App extends Component {
    btnStyle = {
        color: '#fff',
        border: 'none',
        padding: '5px 9px',
        borderRadius: '50%',
        cursor: 'pointer',
        float: 'right',
    };

    getStyle = () => {
        return {
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            TextDecoration: 'none',
        };
    };

    todoData = [
        {id: '1', title: '공부하기', comleted: true},
        {id: '2', title: '청소하기', comleted: false},
    ];
    render() {
        return (
            <div className="container">
                <div className="todoBlock">
                    <div className="title">
                        <h1>할 일 목록</h1>
                    </div>

                    {this.todoData.map(data => {
                        const {id, title, completed} = data;
                        return (
                            <div style={this.getStyle()} key={id}>
                                <input type="checkbox" defalutChecked={completed} />
                                {title}
                                <button style={this.btnStyle}>x</button>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
