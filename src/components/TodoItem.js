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
          <Button onClick={evt => this.removeTodo(this.props.id)}>Remove</Button>
          <br />
          Todo : {this.props.todo.taskName}
          <br />
          Description : {this.props.todo.description}
        </div>
      </div>
    );
  }
}
