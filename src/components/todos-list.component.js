import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './todos-list.css';
var FontAwesome = require('react-fontawesome');
var order = false;

const Todo = props => (
    <tr>
        <td className={props.todo.todo_complete ? 'complete' : ''}>{props.todo.todo_desc}</td>
        <td className={props.todo.todo_complete ? 'complete' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_complete ? 'complete' : ''}>{props.todo.todo_prio}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}><i className="fa fa-edit"></i></Link>
        </td>
    </tr>
)

function compareDesc(a, b){
    var compare1 = a.todo_desc.toLowerCase(); 
    var compare2 = b.todo_desc.toLowerCase(); 
    if (compare1 < compare2){
        return (order ? -1 : 1);  
    }
    if (compare1 > compare2){
        return (order ? 1 : -1); 
    } else {
        return 0;
    }
}

function compareResp(a, b){
    if ((typeof a.todo_responsible === 'undefined') || (typeof b.todo_responsible === 'undefined')) return 0; 
    var compare1 = a.todo_responsible.toLowerCase(); 
    var compare2 = b.todo_responsible.toLowerCase(); 
    if (compare1 < compare2){
        return (order ? -1 : 1); 
    }
    if (compare1 > compare2){
        return (order ? 1: -1);  
    } else {
        return 0;
    }
}

function comparePrio(a, b){
    if (a.todo_prio < b.todo_prio){
        return (order ?  1 :  -1); 
    }
    if (a.todo_prio > b.todo_prio){
        return (order ?  -1 :  1);  
    } else {
        return 0;
    }
}

export default class TodosList extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos: [],
            sortBy: '',
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.sortBy !== prevState.sortBy){
        axios.get('http://localhost:4000/todos/')
        .then(response => {
            console.log(this.state.sortBy);
            if (this.state.sortBy === 'desc'){
                console.log("in desc");
                response.data.sort(compareDesc);
            } else if (this.state.sortBy === 'resp'){
                response.data.sort(compareResp);
            } else if (this.state.sortBy === 'prio'){
                response.data.sort(comparePrio);
            }
            this.setState({ todos: response.data });
        })
        .catch(function (error){
            console.log(error);
        })
      } else {
        console.log("State not changed");   
    }
}

    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    //toggle list order by property
    togglePrio = () => {
        order = !order;
        var rev = this.state.todos.sort(comparePrio); 
        this.setState({sortBy: 'prio', todos: rev})
    }

    toggleDesc = () => {
        order = !order;
        var rev = this.state.todos.sort(compareDesc); 
        this.setState({sortBy: 'desc', todos: rev})
    }

    toggleResp = () => {
        order = !order; 
        var rev = this.state.todos.sort(compareResp); 
        this.setState({sortBy: 'resp', todos: rev})
    }

    render() {
        return (
            <div>
                <h3>Todo List</h3>
                <table className="table" style={{ marginTop: 20}} >
                    <thead>
                        <tr>
                            <th onClick = {this.setSortByDesc}>Description 
                                <i className="fa fa-fw fa-sort" onClick={()=> {this.toggleDesc()}}></i></th>
                            <th onClick = {this.setSortByResp}>Responsible
                                <i className="fa fa-fw fa-sort" onClick={()=> {this.toggleResp()}}></i></th>
                            <th onClick = {this.setSortByPrio}>Priority
                                <i className="fa fa-fw fa-sort" onClick={()=> {this.togglePrio()}}></i></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}