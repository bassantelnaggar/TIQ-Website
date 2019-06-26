import React, { Component } from 'react';
import DisciplesProgramItem from './DisciplesProgramItem';
import PropTypes from 'prop-types';

class DisciplesPrograms extends Component {
 
  render() {
    return this.props.disciplesPrograms.map((disciplesProgram) => (
      <DisciplesProgramItem key={disciplesProgram._id} disciplesProgram={disciplesProgram} 
      delDisciplesProgram={this.props.delDisciplesProgram} 
      updateDisciplesProgram={this.props.updateDisciplesProgram} />
    ));
  }
}

// PropTypes
DisciplesPrograms.propTypes = {
  disciplesPrograms: PropTypes.array.isRequired }

export default DisciplesPrograms;