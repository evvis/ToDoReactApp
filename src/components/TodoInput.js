import React from 'react';
import './Todo.css';
import Button from '@material-ui/core/es/Button/Button';

export default class TodoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  addTodo(taskName, description) {
    if (description.length > 0) {
      this.props.addTodo(taskName, description);
      this.setState({
        taskName: '',
        description: '',
      });
    }
  }

  render() {
    return (
      <form>
        <div>
          <div>
            <input name="taskName" type="text" value={this.state.taskName} onChange={this.handleChange} />
            <input name="description" type="text" value={this.state.description} onChange={this.handleChange} />
          </div>
          <div className="btn">
            <Button onClick={() => this.addTodo(this.state.taskName, this.state.description)}>Save Todo</Button>
          </div>
        </div>
      </form>
    );
  }
}
