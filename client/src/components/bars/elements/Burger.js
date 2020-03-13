import React, { useState } from 'react';

const Burger = () => {
  const style = {
    float: 'right',
    margin: '6px'
  };
  const styleLine = {
    width: '35px',
    height: '5px',
    backgroundColor: 'black',
    margin: '6px 0'
  };

  return (
    <div style={{ width: '100%', display: 'block' }}>
      <div style={style}>
        <div style={styleLine} />
        <div style={styleLine} />
        <div style={styleLine} />
      </div>
    </div>
  );
};

export default Burger;
