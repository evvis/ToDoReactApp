import React, { Component } from 'react';
import './App.css';
import Grid from '@material-ui/core/es/Grid/Grid';
import Button from '@material-ui/core/es/Button/Button';
import Paper from '@material-ui/core/es/Paper/Paper';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import Header from './Header';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: this.getTodosFromLocalStorage(),
      nextId: 1,
      editingTodo: null,
      filter: [
        { importance: 'all' },
        { importance: 'usually' },
        { importance: 'important' },
        { importance: 'very important' },
      ],
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
      }, () => this.saveTodos());
      return;
    }

    todos.push(newTodo);
    this.setState({
      todos,
      nextId: this.state.nextId + 1,
    }, () => this.saveTodos());
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo, index) => todo.id !== id),
    }, () => this.saveTodos());
  }

  completeTodo = (id) => {
    const todos = [...this.state.todos];
    const dateClose = new Date();
    dateClose.setSeconds(1);
    const foundTodo = todos.find(todo => todo.id === id);
    foundTodo.dateClose = dateClose.toLocaleString();
    this.setState({
      todos,
    }, () => this.saveTodos());
  };

  editTodo(todo) {
    this.setState({
      editingTodo: todo,
    }, this.saveTodos());
  }

  todosFiltered = () => {
    const importance = this.state.importance.slice();
    if (this.state.imprtance === 'all') {
      return this.state.todos;
    } if (this.state.importance === 'usually') {
      return this.state.todos.filter(todo => todo.importance === importance);
    } if (this.state.importance === 'important') {
      return this.state.todos.filter(todo => todo.importance === importance);
    } if (this.state.importance === 'very important') {
      return this.state.todos.filter(todo => todo.importance === importance);
    }
    return this.state.todos;
  };

  updateFilter = (importance) => {
    this.setState({
      importance,
    });
  };

  saveTodos() {
    const todos = this.state.todos;
    const str = JSON.stringify(todos);
    localStorage.setItem('todos', str);
  }

  getTodosFromLocalStorage() {
    const str = localStorage.getItem('todos');
    return JSON.parse(str) || [];
  }

  render() {
    const today = new Date();
    return (
      <div className="App">
        <Header />
        <div className="btn-box">
          {
            this.state.filter.map(filter => (
              <Button
                key={filter.importance}
                onClick={() => this.updateFilter(filter.importance)}
              >
                {filter.importance}
              </Button>
            ))
            }
        </div>
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
