import React from 'react';
import './Todo.css';
import Button from '@material-ui/core/es/Button/Button';

export default class TodoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  addTodo(todo) {
    if (todo.length > 0) {
      this.props.addTodo(todo);
      this.setState({ value: '' });
    }
  }

  render() {
    return (
      <div>
        <div>
          <input name="name" type="text" value={this.state.value} onChange={this.handleChange} />
        </div>
        <div className="btn">
          <Button onClick={() => this.addTodo(this.state.value)}>Save Todo</Button>
        </div>
      </div>
    );
  }
}
