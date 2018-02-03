/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import propTypes from 'prop-types';

function ClassSidebar(props) {
  const { classArray } = props;
  const classes = [];
  for (let i = 0; i < classArray.length; i += 1) {
    const studentClass = (
      <div key={i}>
        <h3>{classArray[i].name}</h3>
        <h5>{classArray[i].section}</h5>
      </div>
    );
    classes.push(studentClass);
  }
  return (
    <div>
      <h2>Classes</h2>
      {classes}
    </div>
  );
}

ClassSidebar.propTypes = {
  classArray: propTypes.arrayOf(propTypes.object).isRequired,
};

export default ClassSidebar;
