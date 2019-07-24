import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {
    constructor(props){
        super(props);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangeResp = this.onChangeResp.bind(this);
        this.onChangePrio = this.onChangePrio.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_desc: '', 
            todo_responsible: '', 
            todo_prio: '', 
            todo_complete: false
        }
    }

    onChangeDesc(event) {
        this.setState({
            todo_desc: event.target.value
        });
    }

    onChangeResp(event){
        this.setState({
            todo_responsible: event.target.value 
        });
    }

    onChangePrio(event){
        this.setState({
            todo_prio: event.target.value
        });
    }

    onSubmit(event){
        event.preventDefault(); 
        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_desc}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_prio}`);

        const newTodo = {
            todo_desc: this.state.todo_desc,
            todo_responsible: this.state.todo_responsible,
            todo_prio: this.state.todo_prio,
            todo_complete: this.state.todo_complete
        };
        
        axios.post('http://localhost:4000/todos/add', newTodo)
        .then(res => console.log(res.data));
        
        this.setState({
            todo_desc: '',
            todo_responsible: '',
            todo_prio: '',
            todo_complete: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_desc}
                                onChange={this.onChangeDesc}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.todo_responsible}
                                onChange={this.onChangeResp}
                                />
                    </div>
                    <div className="form-group">
                    Priority:<br></br>
                        <select id="priorityOptions" onChange={this.onChangePrio}>
                            <option value = "1"> 1 </option>
                            <option value = "2"> 2 </option>
                            <option value = "3"> 3 </option>
                            <option value = "4"> 4 </option>
                            <option value = "5"> 5 </option>
                        </select>
                     
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}