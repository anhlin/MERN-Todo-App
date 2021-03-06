import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
    constructor(props) {
        super(props);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this); 
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            todo_desc: '',
            todo_responsible: '',
            todo_prio: '',
            todo_complete: false
        }
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_desc: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_prio: e.target.value
        });
    }

    onChangeTodoCompleted(e) {
        this.setState({
            todo_complete: !this.state.todo_complete
        });
    }
    
    deleteTodo(e){
        e.preventDefault(); 
        axios.post('http://localhost:4000/todos/delete/'+this.props.match.params.id);
        this.props.history.push('/');
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_desc: this.state.todo_desc,
            todo_responsible: this.state.todo_responsible,
            todo_prio: this.state.todo_prio,
            todo_complete: this.state.todo_complete
        };
        console.log(obj);
        axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_desc: response.data.todo_desc,
                    todo_responsible: response.data.todo_responsible,
                    todo_prio: response.data.todo_prio,
                    todo_complete: response.data.todo_complete
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_desc}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.todo_responsible}
                                onChange={this.onChangeTodoResponsible}
                                />
                    </div>
                    <div className="form-group">
                    Priority:<br></br>
                        <select id="priorityOptions" onChange={this.onChangeTodoPriority}>
                            <option value = "1"> 1 </option>
                            <option value = "2"> 2 </option>
                            <option value = "3"> 3 </option>
                            <option value = "4"> 4 </option>
                            <option value = "5"> 5 </option>
                        </select>
                    </div>

                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todo_complete}
                                value={this.state.todo_complete}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary"/>
                        <button className="btn btn-primary btn-danger" onClick = {this.deleteTodo}> Delete </button>
                    </div>
                </form>
            </div>
        )
    }
}