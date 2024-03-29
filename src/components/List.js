import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';
import ListItem from './ListItem';
import "./style.css";
import Spinner from 'react-spinner-material';

class List extends Component {
  state = {
    showForm: false,
    whatNext: "",
    whereNext: "",
    whenNext: "",
    submitEnabled: false
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const { whatNext, whereNext, whenNext } = this.state;
    if (whatNext.length > 0 && whereNext.length > 0 && whenNext.length > 0) {
      this.setState({ submitEnabled: true });
    } else {
      this.setState({ submitEnabled: false });
    }

    this.setState({
      [name]: value
    });
  };

  formSubmit = event => {
    const { whatNext, whereNext, whenNext } = this.state;
    const { addToDo } = this.props;

    event.preventDefault();
    addToDo({ whatNext, whereNext, whenNext });

    this.setState({ whatNext: "", whereNext: "", whenNext: "" });
  };

  renderForm = () => {
    const { showForm, whatNext, whereNext, whenNext, submitEnabled } = this.state;

    if (showForm) {
      return (
        <div id="todo-add-form" className="col s10 offset-s1">
          <form onSubmit={this.formSubmit}>
            <div className="input-field">
              <input 
                value={whatNext}
                onChange={this.handleInputChange}
                id="whatNext"
                name="whatNext"
                type="text"
              />
              <label htmlFor="whatNext">What Next?</label>
            </div>
            <div className="input-field">
              <input 
                value={whereNext}
                onChange={this.handleInputChange}
                id="whereNext"
                name="whereNext"
                type="text"
              />
              <label htmlFor="whereNext">Where?</label>
            </div>
            <div className="input-field">
              <input 
                value={whenNext}
                onChange={this.handleInputChange}
                id="whenNext"
                name="whenNext"
                type="text"
              />
              <label htmlFor="whenNext">When?</label>
            </div>
            <input disabled={!submitEnabled} className="btn red submit-btn" type="submit" value="Create" />
          </form>
        </div>
      );
    }
  };

  renderToDo() {
    const { todos } = this.props;
    const toDos = _.map(todos, (value, key) => {
      return <ListItem key={key} todoId={key} todo={value} />;
    });
    if (!_.isEmpty(toDos)) {
      return toDos;
    }
    return (
      <div className="col s10 offset-s1 center-align">
        <h4>You have no more things todo!</h4>
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchToDos();
  }

  render() {
    const { showForm } = this.state;

    if (this.props.isLoading) {
      return (
        <div className="to-do-list-container">
          <div className="row">
            <Spinner size={80} spinnerColor={"#333"} spinnerWidth={1} visible={true} />
          </div>
        </div>
      );
    }

    return (
      <div className="to-do-list-container">
        <div className="row">
          {this.renderForm()}
          {this.renderToDo()}
        </div>
        <div className="fixed-action-btn">
          <button 
            onClick={() => this.setState({ showForm: !showForm })}
            className="btn-floating btn-large red darken-4"
          >
          {showForm ? (
            <span className="large material-icons">-</span>
          ) : (
            <span className="large material-icons">+</span>
          )}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    todos: data.data,
    isLoading: data.isLoading
  }
}

export default connect(mapStateToProps, actions)(List);