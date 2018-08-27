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
      name: '',
      description: '',
      importance: '',
      dateTime: '',
      dateClose: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  addTodo() {
    if (this.state.name.length > 0) {
      this.props.addTodo(
        this.state.name,
        this.state.description,
        this.state.importance,
        this.state.dateTime,
        this.state.dateClose,
      );
      this.setState({
        name: '',
        description: '',
        importance: '',
        dateTime: '',
        dateClose: '',
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.editingTodo) {
      return;
    }
    const { name, description, importance } = nextProps.editingTodo;
    this.setState({
      name,
      description,
      importance,
    });
  }

  render() {
    return (
      <form style={{ padding: '10px' }}>
        <div>
          <TextField
            name="name"
            type="text"
            label="Todo"
            className="textField"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br />
          <TextField
            name="description"
            type="text"
            label="Description"
            className="textField"
            multiline
            rows="3"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <br />
          <TextField
            name="importance"
            type="select"
            select
            label="Importance"
            className="textField"
            value={this.state.importance}
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
          <br />
          <TextField
            name="dateTime"
            label="DateTime"
            type="datetime-local"
            className="textField"
            value={this.state.dateTime}
            onChange={this.handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="btn">
          <Button onClick={() => this.addTodo()}>
              Save Todo
          </Button>
        </div>
      </form>
    );
  }
}
