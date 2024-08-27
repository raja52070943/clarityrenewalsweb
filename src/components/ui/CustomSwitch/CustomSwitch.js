import React from 'react';
import './CustomSwitch.css';

const CustomSwitch = ({ checked, onChange }) => (
  <div className="custom-switch">
    <input
      type="checkbox"
      className="custom-switch-input"
      checked={checked}
      onChange={onChange}
      id="customSwitch"
    />
    <label className="custom-switch-label" htmlFor="customSwitch">
      <span className="custom-switch-label-text">No</span>
      <span className="custom-switch-slider"></span>
      <span className="custom-switch-label-text">Yes</span>
    </label>
  </div>
);

export default CustomSwitch;
