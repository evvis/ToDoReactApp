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
      todos: [
        {
          id: 1,
          name: 'Test1',
          description: 'sometest1',
          importance: 'usually',
          dateTime: new Date('2018-08-16T10:30'),
          dateClose: '20.08.2018, 10:30:01',
        },
        {
          id: 2,
          name: 'Test2',
          description: 'sometest2',
          importance: 'usually',
          dateTime: new Date('2018-10-18T12:30'),
          dateClose: '',
        },
        {
          id: 3,
          name: 'Test3',
          description: 'sometest3',
          importance: 'important',
          dateTime: new Date('2018-09-01T15:30'),
          dateClose: '',
        },
        {
          id: 4,
          name: 'Test4',
          description: 'sometest4',
          importance: 'very important',
          dateTime: new Date('2018-09-01T15:30'),
          dateClose: '',
        },
      ],
      nextId: 4,
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
      todos[todoIndex] = newTodo;
      this.setState({
        todos,
        editingTodo: null,
      });
      return;
    }

    todos.push(newTodo);
    this.setState({
      todos,
      nextId: this.state.nextId + 1,
    });
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo, index) => todo.id !== id),
    });
  }

  completeTodo = (id) => {
    const todos = [...this.state.todos];
    const dateClose = new Date();
    dateClose.setSeconds(1);
    const foundTodo = todos.find(todo => todo.id === id);
    foundTodo.dateClose = dateClose.toLocaleString();
    this.setState({
      todos,
    });
  };

  editTodo(todo) {
    this.setState({
      editingTodo: todo,
    });
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
