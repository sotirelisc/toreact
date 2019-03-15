import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';
import ListItem from './ListItem';
import "./style.css";

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
    const { showForm } = this.state;

    if (showForm) {
      return (
        <div id="todo-add-form" className="col s10 offset-s1">
          <form onSubmit={this.formSubmit}>
            <div className="input-field">
              <input 
                value={this.state.whatNext}
                onChange={this.handleInputChange}
                id="whatNext"
                name="whatNext"
                type="text"
              />
              <label htmlFor="whatNext">What Next?</label>
            </div>
            <div className="input-field">
              <input 
                value={this.state.whereNext}
                onChange={this.handleInputChange}
                id="whereNext"
                name="whereNext"
                type="text"
              />
              <label htmlFor="whereNext">Where?</label>
            </div>
            <div className="input-field">
              <input 
                value={this.state.whenNext}
                onChange={this.handleInputChange}
                id="whenNext"
                name="whenNext"
                type="text"
              />
              <label htmlFor="whenNext">When?</label>
            </div>
            <input disabled={!this.state.submitEnabled} className="btn red submit-btn" type="submit" value="Create" />
          </form>
        </div>
      );
    }
  };

  renderToDo() {
    const { data } = this.props;
    const toDos = _.map(data, (value, key) => {
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
    data
  }
}

export default connect(mapStateToProps, actions)(List);