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
        <div className="todoleft">tâches restantes: {this.state.todos.filter(todo => !todo.complete).length}</div>
        <div className="buttons">
            <Button id="all" variant="outlined" color="primary" onClick={()=> this.updateTodoToShow("all")}>all</Button>
            <Button id="active" variant="contained" color="secondary" onClick={()=> this.updateTodoToShow("active")}>active</Button>
            <Button id="complete" variant="contained" color="primary" onClick={()=> this.updateTodoToShow("complete")}>complete</Button>
        
        {this.state.todos.some(todo=> todo.complete) ? (
            <Button id="removecomplete" variant="contained" color="primary" onClick={this.removeAllComplete}>
                remove all complete
            </Button>
        ) : null }
        </div>
        <div className="allcomplete">
            <Button  id="complete" variant="contained" color="primary" onClick={()=> this.setState({
                todos : this.state.todos.map(todo => ({
                    ...todo,
                    complete : this.state.toggleAllComplete
                })),
                toggleAllComplete : !this.state.toggleAllComplete

            })}>toggle all complete : {`${this.state.toggleAllComplete}`}</Button>
        </div>

        {todos.map((todo) => (
          <Todo className="liste"
            key={todo.id}
            toggleComplete={() => this.toggleComplete(todo.id)}
            onDelete ={() => this.handleDeleteTodo(todo.id)}
            todo={todo}
          />
          
        ))}
      </div>
    );
  }
}
