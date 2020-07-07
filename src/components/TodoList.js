import React from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import "./TodoList.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default class TodoList extends React.Component {
  state = {
    todos: [],
    todoToShow : 'all',
    toggleAllComplete : true
  };

  addTodo = (todo) => {
    this.setState({
      todos: [todo, ...this.state.todos],
    });
  };

  toggleComplete = (id) => {
      this.setState({
          todos : this.state.todos.map(todo=>{
              if(todo.id === id){
                  return{
                      ...todo,
                      complete : !todo.complete
                  }
              }
              else{
                  return todo;
              }
          })
      })
  };

  updateTodoToShow = (s) =>{
      this.setState({
          todoToShow : s
      })
  }

  handleDeleteTodo = (id)=>{
      this.setState({
          todos : this.state.todos.filter(todo => todo.id !== id)
      })
  }

  removeAllComplete = ()=>{
    this.setState({
        todos : this.state.todos.filter(todo => !todo.complete)
    })
}

  
  render() {
      let todos = []

      if (this.state.todoToShow === "all"){
          todos = this.state.todos;
      } else if (this.state.todoToShow === "active"){
          todos = this.state.todos.filter(todo => !todo.complete)
      }
      else if (this.state.todoToShow === "complete"){
        todos = this.state.todos.filter(todo => todo.complete)
    }


    return (
      <div>
        <TodoForm className="form" onSubmit={this.addTodo} />
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            toggleComplete={() => this.toggleComplete(todo.id)}
            onDelete ={() => this.handleDeleteTodo(todo.id)}
            todo={todo}
          />
        ))}
        <div>todos left: {this.state.todos.filter(todo => !todo.complete).length}</div>
        <div className="buttons">
            <Button id="all" variant="contained" color="primary" onClick={()=> this.updateTodoToShow("all")}>all</Button>
            <Button id="active" variant="contained" color="primary" onClick={()=> this.updateTodoToShow("active")}>active</Button>
            <Button id="complete" variant="contained" color="primary" onClick={()=> this.updateTodoToShow("complete")}>complete</Button>
        </div>
        {this.state.todos.some(todo=> todo.complete) ? (
        <div>
            <button onClick={this.removeAllComplete}>
                remove all complete
            </button>
        </div>
        ) : null }
        <div>
            <button onClick={()=> this.setState({
                todos : this.state.todos.map(todo => ({
                    ...todo,
                    complete : this.state.toggleAllComplete
                })),
                toggleAllComplete : !this.state.toggleAllComplete

            })}>toggle all complete : {`${this.state.toggleAllComplete}`}</button>
        </div>
      </div>
    );
  }
}
