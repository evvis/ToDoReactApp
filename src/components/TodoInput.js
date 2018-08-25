import React from 'react';
import './Todo.css';
import Button from '@material-ui/core/es/Button/Button';
import TextField from '@material-ui/core/es/TextField/TextField';
import MenuItem from '@material-ui/core/es/MenuItem/MenuItem';


const importance = [
  { value: 'usually' },
  { value: 'important' },
  { value: 'very important' },
];

export default class TodoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoName: '',
      todoDescription: '',
      todoImportance: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  addTodo(todoName, todoDescription, todoImportance) {
    if (todoName.length > 0) {
      this.props.addTodo(todoName, todoDescription, todoImportance);
      this.setState({
        todoName: '',
        todoDescription: '',
        todoImportance: '',
      });
    }
  }

  render() {
    return (
      <form>
        <div>
          <div>
            <TextField name="todoName" type="text" label="Todo" value={this.state.todoName} onChange={this.handleChange} />
            <br />
            <TextField name="todoDescription" type="text" label="Description" multiline rows="3" value={this.state.todoDescription} onChange={this.handleChange} />
            <br />
            <TextField
              name="todoImportance"
              select
              label="Importance"
              className="textField"
              value={this.state.todoImportance}
              onChange={this.handleChange}
              SelectProps={{
                MenuProps: {
                  className: importance.menu,
                },
              }}
              helperText="Please select importance"
              margin="normal"
            >
              {importance.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="btn">
            <Button onClick={() => this.addTodo(
              this.state.todoName,
              this.state.todoDescription,
              this.state.todoImportance,
            )}
            >
              Save Todo
            </Button>
          </div>
        </div>
      </form>
    );
  }
}
