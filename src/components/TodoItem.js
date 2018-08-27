import React from 'react';
import './Todo.css';
import Button from '@material-ui/core/es/Button/Button';
import Grid from '@material-ui/core/es/Grid/Grid';
import Paper from '@material-ui/core/es/Paper/Paper';

export default class TodoItem extends React.Component {
  removeTodo(id) {
    this.props.removeTodo(id);
  }

  render() {
    return (
      <form style={{ padding: '5px' }}>
        <Paper
          style={{ padding: '10px', margin: 20 }}
          className={`overdue${this.props.overdue ? '' : 'overdue'}`}
        >
          <Grid container spacing={24}>
            <Grid item xs>
              <div className="todoWrapper">
                <Button onClick={evt => this.removeTodo(this.props.id)}>Remove</Button>
                <Button
                  onClick={() => this.props.editTodo()}
                  disabled={!!this.props.todo.dateClose}
                >
                  Edit
                </Button>
                <div className={`todo-item-card${this.props.todo.dateClose ? '' : 'completed'}`}>
                  <br />
                  Todo :
                  {' '}
                  {this.props.todo.name}
                  <br />
                  Description :
                  {' '}
                  {this.props.todo.description}
                  <br />
                  Importance :
                  {' '}
                  {this.props.todo.importance}
                  <br />
                  DT :
                  {' '}
                  {this.props.todo.dateTime ? this.props.todo.dateTime.toLocaleString() : null}
                </div>
              </div>
            </Grid>
            <Grid item xs>
              <div style={{ padding: 25 }}>
                <Button
                  style={{ backgroundColor: '#90CAF9', padding: 15 }}
                  onClick={() => this.props.completeTodo(this.props.id)}
                  disabled={!!this.props.todo.dateClose}
                >
                  Done
                </Button>
                <br />
                <div style={{ paddingTop: 20 }}>
                  {this.props.todo.dateClose
                    ? this.props.todo.dateClose.toLocaleString() : null}
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </form>
    );
  }
}
