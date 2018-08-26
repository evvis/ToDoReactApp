import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          id: 1,
          todoName: 'Test1',
          todoDescription: 'sometest1',
          todoImportance: 'usually',
          todoDateTime: new Date('2018-08-16T10:30'),
          todoDateClose: '2018-08-20T10:30',
        },
        {
          id: 2,
          todoName: 'Test2',
          todoDescription: 'sometest2',
          todoImportance: 'usually',
          todoDateTime: new Date('2018-10-18T12:30'),
          todoDateClose: '',
        },
        {
          id: 3,
          todoName: 'Test3',
          todoDescription: 'sometest3',
          todoImportance: 'important',
          todoDateTime: new Date('2018-09-01T15:30'),
          todoDateClose: '',
        },
      ],
      nextId: 4,
      editingTodo: null,
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  addTodo(todoText, todoDescriptionText, todoImportance, todoDateTime, todoDateClose) {
    const todos = this.state.todos.slice();
    const newTodo = { id: this.state.nextId, todoName: todoText, todoDescription: todoDescriptionText, todoImportance, todoDateTime, todoDateClose,
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
    foundTodo.todoDateClose = dateClose.toLocaleString();
    this.setState({
      todos,
    });
  };

  editTodo(todo) {
    this.setState({
      editingTodo: todo,
    });
  }

  render() {
    const today = new Date();
    return (
      <div className="App">
        <Header />
        <TodoInput editingTodo={this.state.editingTodo} addTodo={this.addTodo} />
        <ul>
          {
           this.state.todos.map((todo) => {
             const overdue = today > todo.todoDateTime;
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
        </ul>
      </div>
    );
  }
}

export default App;
