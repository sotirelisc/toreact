import React, { Component } from 'react';
import { Icon } from 'react-materialize';
import { connect } from 'react-redux';
import { completeToDo } from '../actions';

class ListItem extends Component {
  completeClick = completeTodoId => {
    const { completeToDo } = this.props;

    completeToDo(completeTodoId);
  };

  render() {
    const { todoId, todo } = this.props;
    const { whatNext, whereNext, whenNext } = todo;

    return (
      <div key="toDoName" className="col s10 offset-s1 to-do-list-item red">
        <h4 className="what-next">{whatNext}</h4>
        <span 
          onClick={() => this.completeClick(todoId)}
          className="complete-todo-item btn black"
        >
          <span>Done</span>
        </span>
        <h4 className="where-next"><Icon tiny>location_on</Icon>{whereNext}</h4>
        <h4 className="when-next"><Icon tiny>date_range</Icon>{whenNext}</h4>
      </div>
    );
  }
}

export default connect(null, {completeToDo})(ListItem);