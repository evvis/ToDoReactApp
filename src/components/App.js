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
        { id: 0, todoName: 'Test1', todoDescription: 'sometest1' },
        { id: 1, todoName: 'Test2', todoDescription: 'sometest2' },
        { id: 2, todoName: 'Test3', todoDescription: 'sometest3' },
      ],
      nextId: 3,
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  addTodo(todoText, todoDescriptionText) {
    const todos = this.state.todos.slice();
    todos.push({ id: this.state.nextId, todoName: todoText, todoDescription: todoDescriptionText });
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
