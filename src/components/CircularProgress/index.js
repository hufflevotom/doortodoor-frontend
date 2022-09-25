import React from "react";

const CircularProgress = ({ className }) => (
  <div className={`loader ${className}`}>
    <img src="/assets/images/logo.png" alt="loader" />
  </div>
);
export default CircularProgress;
