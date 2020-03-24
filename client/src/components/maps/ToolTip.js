import React from 'react';

const ToolTip = ({ indicator }) => {
  return indicator ? (
    <div class="top">
      {/* <h3>indicator</h3> */}
      {indicator}
      <i></i>
    </div>
  ) : null;
};

export default ToolTip;
