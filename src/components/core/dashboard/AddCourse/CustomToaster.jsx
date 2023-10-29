import React, { useState, useEffect } from 'react';
import './CustomToaster.css';

export const CustomToaster = ({ message, progress }) => {
  return (
    <div className="custom-toaster">
      <div className="message">{message}</div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}>
          {`${progress}%`}
        </div>
      </div>
    </div>
  );
};

