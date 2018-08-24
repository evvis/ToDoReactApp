import React from 'react';
import './Todo.css';
import Button from '@material-ui/core/es/Button/Button';

export default class TodoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoName: '',
      todoDescription: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  addTodo(todoName, todoDescription) {
    if (todoName.length > 0) {
      this.props.addTodo(todoName, todoDescription);
      this.setState({
        todoName: '',
        todoDescription: '',
      });
    }
  }

  render() {
    return (
      <form>
        <div>
          <div>
            <input name="todoName" type="text" value={this.state.todoName} onChange={this.handleChange} />
            <input name="todoDescription" type="text" value={this.state.todoDescription} onChange={this.handleChange} />
          </div>
          <div className="btn">
            <Button onClick={() => this.addTodo(this.state.todoName, this.state.todoDescription)}>Save Todo</Button>
          </div>
        </div>
      </form>
    );
  }
}
