import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeToDo } from '../actions';

class ListItem extends Component {
  completeClick = completeTodoId => {
    const { completeToDo } = this.props;

    completeToDo(completeTodoId);
  };
  render() {
    const { todoId, todo } = this.props;

    return (
      <div key="toDoName" className="col s10 offset-s1 to-do-list-item red">
        <h4>
          {todo.title}
          <span 
            onClick={() => this.completeClick(todoId)}
            className="complete-todo-item btn black"
          >
            <span className="material-icons">Done</span>
          </span>
        </h4>
      </div>
    );
  }
}

export default connect(null, {completeToDo})(ListItem);