import React from 'react';
import './Todo.css';
import Button from '@material-ui/core/es/Button/Button';
import Grid from '@material-ui/core/es/Grid/Grid';
import Paper from '@material-ui/core/es/Paper/Paper';
import Checkbox from '@material-ui/core/es/Checkbox/Checkbox';


export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  removeTodo(id) {
    this.props.removeTodo(id);
  }

  render() {
    return (
      <Paper style={{padding: '1em', margin: 20}}>
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <div className="todoWrapper">
              <Button onClick={evt => this.removeTodo(this.props.id)}>Remove</Button>
              <Button style={{ backgroundColor: '#E3F2FD'}}>Edit</Button>
              <div className={"todo-item-card" + (this.props.todo.todoComplete ? '' : 'completed')}>
                <br />
                Todo : {this.props.todo.todoName}
                <br />
                Description : {this.props.todo.todoDescription}
                <br />
                Importance : {this.props.todo.todoImportance}
                <br />
                DT : {this.props.todo.todoDateTime}
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div style={{ padding: 25}}>
              <Button style={{ backgroundColor: '#90CAF9', padding: 15}}
                      onClick={() => this.props.completeTodo(this.props.id)}
              >
                {this.props.todo.todoComplete ? 'unDone' : 'Done'}
              </Button>
              <Checkbox
                  onChange={ () => this.props.completeTodo(this.props.id) }
                  checked={this.props.todo.todoComplete}
              />
              <br />
              <div>{this.props.todo.todoDateClose}</div>
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
