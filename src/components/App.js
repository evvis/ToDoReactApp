import React, { Component } from 'react';
import './App.css';
import Grid from '@material-ui/core/es/Grid/Grid';
import Paper from '@material-ui/core/es/Paper/Paper';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import Header from './Header';

const LOCAL_STORAGE_KEY = 'todos';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: this.getTodosFromLocalStorage(),
      nextId: 1,
      editingTodo: null,
      importance: '',
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  addTodo(name, description, importance, dateTime, dateClose) {
    const todos = this.state.todos.slice();
    const newTodo = {
      id: this.state.nextId,
      name,
      description,
      importance,
      dateTime,
      dateClose,
    };
    if (this.state.editingTodo) {
      newTodo.todoComplete = this.state.editingTodo.todoComplete;
      const todoIndex = todos.findIndex(todo => todo.id === this.state.editingTodo.id);
      newTodo.id = this.state.editingTodo.id;
      todos[todoIndex] = newTodo;
      this.setState({
        todos,
        editingTodo: null,
      }, () => this.saveTodosToLocalStorage());
      return;
    }

    todos.push(newTodo);
    this.setState({
      todos,
      nextId: this.state.nextId + 1,
    }, () => this.saveTodosToLocalStorage());
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo, index) => todo.id !== id),
    }, () => this.saveTodosToLocalStorage());
  }

  completeTodo = (id) => {
    const todos = [...this.state.todos];
    const dateClose = new Date();
    dateClose.setSeconds(1);
    const foundTodo = todos.find(todo => todo.id === id);
    foundTodo.dateClose = dateClose.toLocaleString();
    this.setState({
      todos,
    }, () => this.saveTodosToLocalStorage());
  };

  editTodo(todo) {
    this.setState({
      editingTodo: todo,
    }, this.saveTodosToLocalStorage());
  }

  todosFiltered = () => {
    const state = this.state;
    const importance = state.importance;

    if (importance) {
      return state.todos.filter(todo => todo.importance === importance);
    }
    return state.todos;
  };

  updateFilter = (importance) => {
    this.setState({
      importance,
    });
  };

  saveTodosToLocalStorage() {
    const todos = this.state.todos;
    const str = JSON.stringify(todos);
    localStorage.setItem(LOCAL_STORAGE_KEY, str);
  }

  getTodosFromLocalStorage() {
    const str = localStorage.getItem(LOCAL_STORAGE_KEY);
    return JSON.parse(str) || [];
  }

  render() {
    const today = new Date();
    return (
      <div className="App">
        <Header updateFilter={this.updateFilter} />
        <Grid container spacing={24}>
          <Grid item xs>
            <Paper style={{ margin: '1em' }}>
              <div>
                <TodoInput
                  editingTodo={this.state.editingTodo}
                  addTodo={this.addTodo}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper style={{ margin: '1em', overflowY: 'auto', height: '500px' }}>
              {
               this.todosFiltered().map((todo) => {
                 const overdue = today > todo.dateTime;
                 return (
                   <TodoItem
                     overdue={overdue}
                     todo={todo}
                     key={todo.id}
                     id={todo.id}
                     removeTodo={this.removeTodo}
                     completeTodo={this.completeTodo}
                     editTodo={() => this.editTodo(todo)}
                   />
                 );
               })
               }
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
