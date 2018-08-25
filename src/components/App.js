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
          id: 0,
          todoName: 'Test1',
          todoDescription: 'sometest1',
          todoImportance: 'usually',
          todoDateTime: '2018-08-16T10:30',
          todoCompleted: true,
          todoEditing: false,
        },
        {
          id: 1,
          todoName: 'Test2',
          todoDescription: 'sometest2',
          todoImportance: 'usually',
          todoDateTime: '2018-10-18T12:30',
          todoCompleted: false,
          todoEditing: false,
        },
        {
          id: 2,
          todoName: 'Test3',
          todoDescription: 'sometest3',
          todoImportance: 'important',
          todoDateTime: '2018-09-1T15:30',
          todoCompleted: true,
          todoEditing: false,
        },
      ],
      nextId: 3,
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  addTodo(todoText, todoDescriptionText, todoImportance, todoDateTime, todoCompleted) {
    const todos = this.state.todos.slice();
    todos.push({
      id: this.state.nextId, todoName: todoText, todoDescription: todoDescriptionText, todoImportance, todoDateTime, todoCompleted,
    });
    this.setState({
      todos,
      nextId: ++this.state.nextId,
    });
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo, index) => todo.id !== id),
    });
  }

  completedTodo = (id) => {
    const todos = this.state.todos;
    todos[id].todoCompleted = !todos[id].todoCompleted;
    this.setState({ todos });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <TodoInput addTodo={this.addTodo} />
        <ul>
          {
           this.state.todos.map(todo => (
             <TodoItem
               todo={todo}
               key={todo.id}
               id={todo.id}
               removeTodo={this.removeTodo}
               completedTodo={this.completedTodo}
             />
           ))
          }
        </ul>
      </div>
    );
  }
}

export default App;
