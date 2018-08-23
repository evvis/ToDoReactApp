import React from 'react';
import './Todo.css';
import Button from '@material-ui/core/es/Button/Button';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  removeTodo(id) {
    this.props.removeTodo(id);
  }

  render() {
    return (
      <div className="todoWrapper">
        <div className="btnRemove">
          <Button onClick={e => this.removeTodo(this.props.id)}>Remove</Button>
          {this.props.todo.text}
        </div>
      </div>
    );
  }
}
