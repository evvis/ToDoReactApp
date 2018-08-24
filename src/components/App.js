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
        { id: 0, taskName: 'Test1', description: 'sometest1' },
        { id: 1, taskName: 'Test2', description: 'sometest2' },
        { id: 2, taskName: 'Test3', description: 'sometest3' },
      ],
      nextId: 3,
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  addTodo(taskText, descriptionText) {
    const todos = this.state.todos.slice();
    todos.push({ id: this.state.nextId, taskName: taskText, description: descriptionText });
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
            />
          ))
          }
        </ul>
      </div>
    );
  }
}

export default App;
